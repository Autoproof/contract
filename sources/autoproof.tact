import "@stdlib/ownable";
import "@stdlib/deploy";

// Contract for autoproof document claim mechanism.

message DeclareDocuments {
    authorship: String;

    description: String;
    rootHash: String;

    data: String;
    tags: String;
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

    receive(msg: DeclareDocuments) {
        require(context().value > ton("0.02"), "Not enough funds");

        self.validateDeclaration(msg);

        self.documentsNumber = self.documentsNumber + 1;

        let init: StateInit = initOf Document(myAddress(), self.documentsNumber, sender());
        send(SendParameters{
            to: contractAddress(init),
            body: "Init document".asComment(),
            value: ton("0.01"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });

        self.reply(DocumentDeclaration{ address: myAddress() }.toCell());
    }

    receive(msg: GetFunds) {
        require(self.owner == sender(), "Only owner can get funds");

        if (myBalance() > msg.amount) {
            send(SendParameters{
                to: sender(),
                value: msg.amount,
                mode: SendIgnoreErrors,
                body: "Send funds to the owner".asComment(),
            });
        }
        self.reply("Sent funds to the owner".asComment());
    }

    // internals
    fun validateDeclaration(msg: DeclareDocuments) {
        require(msg.authorship != "", "Authorship can't be empty");
        require(msg.description != "", "Description hash can't be empty");
        require(msg.rootHash != "", "RootHash hash can't be empty");
        require(msg.data != "", "Data hash can't be empty");
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

    receive(msg: SetCost) {
        require(self.exclusiveRightsOwner == sender(), "Only exclusive rights owner can set the cost");
        require(self.currentClaim == null, "Transfer is in progress");
        self.cost = msg.cost;
        self.reply("Cost is updated".asComment());
    }

    receive("claim-rights-transfer") {
        require(self.cost != null, "Exclusive rights transfer is not available");
        require(self.cost!! >= context().value, "Not enough funds");
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
    }

    receive("approve") {
        require(self.currentClaim != null, "Can't approve without a claim");
        require(self.currentClaim!!.sentDocuments, "Can't approve if documents are not sent");
        require(self.currentClaim!!.viewedDocuments, "Can't approve if documents are not sent");
        require(sender() == self.currentClaim!!.author, "Only author of the claim can approve");

        // send funds to the current exclusive rights owner
        send(SendParameters{
            to: self.exclusiveRightsOwner,
            value: self.currentClaim!!.amount,
            mode: SendIgnoreErrors,
            body: "Send funds to the exclusive rights owner".asComment(),
        });

        // change the exclusive rights owner
        self.exclusiveRightsOwner = sender();
        self.cost = null;
        self.currentClaim = null;
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
                value: self.currentClaim!!.amount,
                mode: SendIgnoreErrors,
                body: "Return funds to the claimer".asComment(),
        });

        self.currentClaim = null;
        self.reply("Claim is canceled".asComment());
    }

    receive(msg: GetFunds) {
        require(self.exclusiveRightsOwner == sender(), "Only exclusive rights owner can get funds");

        if (myBalance() > msg.amount) {
            send(SendParameters{
                to: sender(),
                value: msg.amount,
                mode: SendIgnoreErrors,
                body: "Return funds to the exclusive rights owner".asComment(),
            });
        }
        self.reply("Sent funds to the exclusive rights owner".asComment());
    }
}
