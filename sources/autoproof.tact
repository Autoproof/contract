import "@stdlib/ownable";
import "@stdlib/deploy";

// Contract for autoproof document claim mechanism.

struct DocumentData {
    authorship: String;
    description: String;
    rootHash: String;
    data: String;
    tags: String;
}

message DeclareDocument {
    document: DocumentData;
}

message DocumentDeclaration {
    address: Address;
}

message GetFunds {
    amount: Int as coins;
}

contract Autoproof with Deployable, Ownable {
    owner: Address;
    documentsNumber: Int as uint256 = 0;

    init() {
        self.owner = sender();
    }

    get fun documentsNumber(): Int {
        return self.documentsNumber;
    }

    get fun documentAddress(seqno: Int, author: Address): Address {
        return contractAddress(initOf Document(myAddress(), seqno, author));
    }

    receive(msg: DeclareDocument) {
        self.validateDeclaration(msg.document);
        self.documentsNumber = self.documentsNumber + 1;

        let init: StateInit = initOf Document(myAddress(), self.documentsNumber, sender());
        send(SendParameters{
            to: contractAddress(init),
            body: msg.toCell(),
            value: context().value,
            code: init.code,
            data: init.data
        });
    }

    receive(msg: GetFunds) {
        require(self.owner == sender(), "Only owner can get funds");
        require(myBalance() > msg.amount, "Not enough funds");

        send(SendParameters{
            to: sender(),
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: "Send funds to the owner".asComment(),
        });
    }

    // internals
    fun validateDeclaration(document: DocumentData) {
        require(document.authorship != "", "Authorship can't be empty");
        require(document.description != "", "Description hash can't be empty");
        require(document.rootHash != "", "RootHash hash can't be empty");
        require(document.data != "", "Data can't be empty");
        require(document.tags != "", "Tags can't be empty");
    }
}

message SetCost {
    cost: Int? as coins;
}

struct ExclusiveRightsClaim {
    author: Address;
    amount: Int as coins;
    sentDocuments: Bool;
    viewedDocuments: Bool;
}

contract Document {
    parent: Address;
    seqno: Int as uint256;

    // transfership data
    cost: Int? as coins;
    currentClaim: ExclusiveRightsClaim?;

    author: Address;
    exclusiveRightsOwner: Address;

    document: DocumentData?;

    // author is owner when created
    init(parent: Address, seqno: Int, author: Address) {
        self.parent = parent;
        self.seqno = seqno;

        self.author = author;
        self.exclusiveRightsOwner = author;
    }

    get fun currentCost(): Int? {
        return self.cost;
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

    get fun documentData(): DocumentData? {
        return self.document;
    }

    // returns 10% Autoproof commission
    fun commission(): Int {
        if (self.cost != null) {
            return self.cost!! / 100 * 10;
        } else {
            return 0;
        }
    }

    receive(msg: DeclareDocument) {
        require(sender() == self.parent, "Only Autoproof is allowed to set the document data");
        require(self.document == null, "Document data can be declared only once");
        self.document = msg.document;
    }

    receive(msg: SetCost) {
        require(self.exclusiveRightsOwner == sender(), "Only exclusive rights owner can set the cost");
        require(self.currentClaim == null, "Transfer is in progress");
        self.cost = msg.cost;
        self.reply("Cost is updated".asComment());
    }

    receive("claim-rights-transfer") {
        require(self.cost != null, "Exclusive rights transfer is not available");
        require(context().value > (self.cost!! + self.commission()), "Not enough funds.");
        require(self.currentClaim == null, "Transfer is in progress");

        // set the new claim
        self.currentClaim = ExclusiveRightsClaim{
            author: sender(),
            amount: context().value,
            sentDocuments: false,
            viewedDocuments: false
        };
    }

    receive("sent-documents") {
        require(self.currentClaim != null, "Can't update without a claim");
        require(self.exclusiveRightsOwner == sender(), "Only the exclusive rights have access");

        self.currentClaim = ExclusiveRightsClaim{
            author: self.currentClaim!!.author,
            amount: self.currentClaim!!.amount,
            sentDocuments: true,
            viewedDocuments: false
        };
        self.reply("Documents are marked as sent".asComment());
    }

    receive("viewed-documents") {
        require(self.currentClaim != null, "Can't update without a claim");
        require(self.currentClaim!!.author == sender(), "Only the author of the claim have access");
        require(self.currentClaim!!.sentDocuments, "Can't view documents if they are not sent");

        self.currentClaim = ExclusiveRightsClaim{
            author: self.currentClaim!!.author,
            amount: self.currentClaim!!.amount,
            sentDocuments: true,
            viewedDocuments: true
        };
        self.reply("Documents are marked as viewed".asComment());
    }

    receive("approve") {
        require(self.currentClaim != null, "Can't approve without a claim");
        require(self.currentClaim!!.sentDocuments, "Can't approve if documents are not sent");
        require(self.currentClaim!!.viewedDocuments, "Can't approve if documents are not viewed");
        require(sender() == self.currentClaim!!.author, "Only author of the claim can approve");

        // send funds to the current exclusive rights owner
        send(SendParameters{
            to: self.exclusiveRightsOwner,
            value: self.currentClaim!!.amount,
            mode: SendIgnoreErrors,
            body: "Send funds to the exclusive rights owner".asComment(),
        });

        // send commission to the parent contract
        send(SendParameters{
            to: self.parent,
            value: self.commission(),
            bounce: false,
            mode: SendIgnoreErrors,
            body: "Send commission to Autoproof".asComment(),
        });

        // change the exclusive rights owner
        self.exclusiveRightsOwner = sender();
        self.cost = null;
        self.currentClaim = null;
        self.reply("Claim is approved".asComment());
    }

    receive("cancel") {
        require(self.currentClaim != null, "Can't cancel without a claim");
        require((sender() == self.exclusiveRightsOwner) || (sender() == self.currentClaim!!.author),
            "Only exclusive rights owner or author of the claim can cancel");
        require(self.currentClaim!!.sentDocuments == false ||
            (self.currentClaim!!.sentDocuments && self.currentClaim!!.viewedDocuments),
            "Can't cancel if documents were sent but not viewed");

        send(SendParameters{
                to: self.currentClaim!!.author,
                value: self.currentClaim!!.amount + self.commission(),
                mode: SendIgnoreErrors,
                body: "Return funds to the claimer".asComment(),
        });

        self.currentClaim = null;
        self.reply("Claim is canceled".asComment());
    }

    receive(msg: GetFunds) {
        require(self.exclusiveRightsOwner == sender(), "Only exclusive rights owner can get funds");
        require(self.currentClaim == null, "Can't get funds during the transfer");
        require(myBalance() > msg.amount, "Not enough funds");

        send(SendParameters{
            to: sender(),
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: "Return funds to the exclusive rights owner".asComment(),
        });
    }
}
