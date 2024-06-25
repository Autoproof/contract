import "@stdlib/ownable";
import "@stdlib/deploy";

// ownable
contract ExchangeContract with Deployable, Ownable {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }
}