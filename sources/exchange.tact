import "@stdlib/ownable";
import "@stdlib/deploy";

// Contract for the job exchange

// ownable
contract ExchangeContract with Deployable, Ownable {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }
}