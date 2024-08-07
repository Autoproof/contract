import "@stdlib/ownable";
import "@stdlib/deploy";
import "./common.tact";

struct ExclusiveRightsClaim {
    author: Address;
    authorDetails: PersonDetails;
    amount: Int as coins;
    sentDocuments: Bool;
    viewedDocuments: Bool;
}

message SetPrice {
    price: Int? as coins;
}

message ClaimRequest {
    authorDetails: PersonDetails;
}

message ClaimApproval {
    assignmentHash: String;
}

contract Document {
    parent: Address;
    seqno: Int as uint256;
    commissions: Commissions;

    author: Address;

    exclusiveRightsOwner: Address;
    exclusiveRightsOwnerDetails: PersonDetails;

    document: DocumentData;

    price: Int? as coins;
    currentClaim: ExclusiveRightsClaim?;
    assignmentHash: String?;

    royaltyWalletAddress: Address?;
    

    // author is owner when created
    init(parent: Address, seqno: Int, author: Address, document: DocumentData, commissions: Commissions, royaltyWalletAddress: Address?) {
        self.parent = parent;
        self.seqno = seqno;

        self.author = author;
        self.exclusiveRightsOwner = author;
        self.exclusiveRightsOwnerDetails = document.author;

        self.document = document;
        self.commissions = commissions;
        self.royaltyWalletAddress = royaltyWalletAddress;
    }

    get fun currentCommissions(): Commissions {
        return self.commissions;
    }

    get fun currentTransfershipCommissionPercentage(): Int {
        return self.commissions.transfershipCommissionPercentage;
    }

    get fun currentRoyaltyCommissionPercentage(): Int {
        return self.commissions.royaltyCommissionPercentage;
    }

    get fun currentPrice(): Int? {
        return self.price;
    }

    get fun currentClaim(): ExclusiveRightsClaim? {
        return self.currentClaim;
    }

    get fun author(): Address {
        return self.author;
    }

    get fun exclusiveRightsOwner(): Address {
        return self.exclusiveRightsOwner;
    }

    get fun exclusiveRightsOwnerDetails(): PersonDetails {
        return self.exclusiveRightsOwnerDetails;
    }

    get fun royaltyWalletAddress(): Address? {
        return self.royaltyWalletAddress;
    }

    get fun documentData(): DocumentData {
        return self.document;
    }

    get fun assignmentHash(): String? {
        return self.assignmentHash;
    }

    // Returns a summed commision for the transfership (includes royalty)
    get fun summedCommission(): Int {
        return self.transfershipCommission() + self.royaltyCommission();
    }

    get fun transfershipCommission(): Int {
        if (self.price != null) {
            return self.price!! / 1000 * self.currentTransfershipCommissionPercentage();
        } else {
            return 0;
        }
    }

    get fun royaltyCommission(): Int {
        if (self.price != null) {
            return self.price!! / 1000 * self.currentRoyaltyCommissionPercentage();
        } else {
            return 0;
        }
    }

    receive(msg: SetPrice) {
        require(self.exclusiveRightsOwner == sender(), "Only exclusive rights owner can set the price");
        require(self.currentClaim == null, "Transfer is in progress");
        self.price = msg.price;
        self.reply("Price is updated".asComment());
    }

    receive(msg: ClaimRequest) {
        require(self.price != null, "Exclusive rights transfer is not available");
        require(context().value > (self.price!! + self.summedCommission()), "Not enough funds.");
        require(self.currentClaim == null, "Transfer is in progress");

        // set the new claim
        self.currentClaim = ExclusiveRightsClaim{
            author: sender(),
            authorDetails: msg.authorDetails,
            amount: context().value,
            sentDocuments: false,
            viewedDocuments: false
        };
    }

    receive("mark-documents-as-sent") {
        require(self.currentClaim != null, "Can't update without a claim");
        require(self.exclusiveRightsOwner == sender(), "Only the exclusive rights have access");

        self.currentClaim = ExclusiveRightsClaim{
            author: self.currentClaim!!.author,
            authorDetails: self.currentClaim!!.authorDetails,
            amount: self.currentClaim!!.amount,
            sentDocuments: true,
            viewedDocuments: false
        };
        self.reply("Documents are marked as sent".asComment());
    }

    receive("mark-documents-as-viewed") {
        require(self.currentClaim != null, "Can't update without a claim");
        require(self.currentClaim!!.author == sender(), "Only the author of the claim have access");
        require(self.currentClaim!!.sentDocuments, "Can't view documents if they are not sent");

        self.currentClaim = ExclusiveRightsClaim{
            author: self.currentClaim!!.author,
            authorDetails: self.currentClaim!!.authorDetails,
            amount: self.currentClaim!!.amount,
            sentDocuments: true,
            viewedDocuments: true
        };
        self.reply("Documents are marked as viewed".asComment());
    }

    receive(msg: ClaimApproval) {
        require(self.currentClaim != null, "Can't approve without a claim");
        require(self.currentClaim!!.sentDocuments, "Can't approve if documents are not sent");
        require(self.currentClaim!!.viewedDocuments, "Can't approve if documents are not viewed");
        require(sender() == self.currentClaim!!.author, "Only author of the claim can approve");

        // send funds to the current exclusive rights owner
        send(SendParameters{
            to: self.exclusiveRightsOwner,
            value: self.currentClaim!!.amount,
            bounce: false,
            body: "Send funds to the exclusive rights owner".asComment(),
        });

        if (self.royaltyWalletAddress != null) {
            // send royalty commission to the royalty wallet
            send(SendParameters{
                to: self.royaltyWalletAddress!!,
                value: self.royaltyCommission(),
                bounce: false,
                body: "Send royalty commission".asComment(),
            });
        }

        // if there is no roylty wallet address
        // the autoproof commission = transfership + royalty
        let autoproofCommission: Int = self.royaltyWalletAddress == null ? self.summedCommission() : self.transfershipCommission();

        // send autoproof commission
        send(SendParameters{
            to: self.parent,
            value: autoproofCommission,
            bounce: false,
            body: "Send commission to Autoproof".asComment(),
        });

        // change the exclusive rights owner
        self.exclusiveRightsOwner = sender();
        self.exclusiveRightsOwnerDetails = self.currentClaim!!.authorDetails;

        self.assignmentHash = msg.assignmentHash;
        self.price = null;
        self.currentClaim = null;
        self.reply("Claim is approved".asComment());
    }

    receive("cancel") {
        require(self.currentClaim != null, "Can't cancel without a claim");

        // Autoproof contract can cancel at any time as an arbiter to resolve the dispute
        if (sender() != self.parent) {
            require((sender() == self.exclusiveRightsOwner) || (sender() == self.currentClaim!!.author),
                "Only exclusive rights owner or author of the claim can cancel");
            require(self.currentClaim!!.sentDocuments == false ||
                (self.currentClaim!!.sentDocuments && self.currentClaim!!.viewedDocuments),
                "Can't cancel if documents were sent but not viewed");
        }

        send(SendParameters{
                to: self.currentClaim!!.author,
                value: self.currentClaim!!.amount + self.summedCommission(),
                bounce: false,
                body: "Return funds to the claimer".asComment(),
        });

        self.currentClaim = null;
        self.reply("Claim is canceled".asComment());
    }

    receive(msg: SetCommissions) {
        require(self.parent == sender(), "Only parent contract can set the commissions");

        validateCommissions(msg.commissions);

        self.commissions = msg.commissions;

        send(SendParameters{
            to: sender(),
            value: context().value,
            body: "The document's commissions were updated".asComment(),
        });
    }

    receive(msg: GetFunds) {
        require(self.exclusiveRightsOwner == sender(), "Only exclusive rights owner can get funds");

        // owner can get funds at any moment but no more than the claim's frozen amount
        let currentClaimAmount: Int = self.currentClaim == null ? 0 : self.currentClaim!!.amount;
        require((myBalance() - currentClaimAmount) > msg.amount, "Not enough funds");

        send(SendParameters{
            to: sender(),
            value: msg.amount,
            body: "Return funds to the exclusive rights owner".asComment(),
        });
    }
}
