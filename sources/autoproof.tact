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

    // TODO: do we really need a tx id here?
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

        require(msg.authorship != "", "Authorship can't be empty");
        require(msg.authorshipHash != "", "Authorship hash can't be empty");

        require(msg.description != "", "Description hash can't be empty");
        require(msg.rootHash != "", "RootHash hash can't be empty");

        require(msg.data != "", "Data hash can't be empty");
    }

    receive(msg: TransferExclusiveRights) {
        self.requireOwner();

        require(msg.author != msg.client, "Can't transfer right to itself");
        require(msg.authorName != "", "Author's name can't be empty");
        require(msg.clientName != "", "Client's name can't be empty");
        require(msg.signedDocumentHash != "", "SignedDocumentHash can't be empty");

        require(msg.declarationTransactionId != "", "DeclarationTransactionId can't be empty");
    }
}