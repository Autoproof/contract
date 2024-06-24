import "@stdlib/ownable";
import "@stdlib/deploy";

message SignDocuments {
    authorship: String;
    authorshipHash: String;
    authorAddress: Address;

    description: String;
    rootHash: String;

    data: String;
    tags: String;
}


// ownable
contract AutoproofContract with Deployable, Ownable {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: SignDocuments) {
        self.requireOwner();
    }
}