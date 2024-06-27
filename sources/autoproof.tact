import "@stdlib/ownable";
import "@stdlib/deploy";

// Contract for autoproof document claim mechanism.

// TODO: describe the fields
//
message DeclareDocuments {
    authorship: String;
    authorshipHash: String;
    authorAddress: Address;

    description: String;
    rootHash: String;

    data: String;
    tags: String;
}

// TODO: describe the fields
//
message TransferExclusiveRights {
    authorName: String;
    author: Address;

    clientName: String;
    client: Address;

    signedDocumentHash: String;
    declarationTransactionId: String;
}


// TODO: write a description and the logic of the method
contract AutoproofContract with Deployable, Ownable {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: DeclareDocuments) {
        self.requireOwner();
    }

    receive(msg: TransferExclusiveRights) {
        self.requireOwner();
    }
}