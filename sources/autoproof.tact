import "@stdlib/ownable";
import "@stdlib/deploy";

// Contract for autoproof document claim mechanism.

// TODO: describe the fields
message ClaimDocuments {
    authorship: String;
    authorshipHash: String;
    authorAddress: Address;

    description: String;
    rootHash: String;

    data: String;
    tags: String;
}


// TODO: write a description and the logic if the method
contract AutoproofContract with Deployable, Ownable {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: ClaimDocuments) {
        self.requireOwner();
    }
}