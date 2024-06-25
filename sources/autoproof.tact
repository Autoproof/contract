import "@stdlib/ownable";
import "@stdlib/deploy";

// Contract for autoproof document claim mechanism.

message ClaimDocuments {
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

    receive(msg: ClaimDocuments) {
        self.requireOwner();
    }
}