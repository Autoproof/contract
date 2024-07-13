import "@stdlib/ownable";
import "@stdlib/deploy";
import "./document.tact";
import "./common.tact";

// Contract for autoproof document claim mechanism.

message DeclareDocument {
    document: DocumentData;
}

contract Autoproof with Deployable, Ownable {
    owner: Address;
    documentsNumber: Int as uint256 = 0;
    commissionPercentage: Int as uint256 = 10; // 10% by default

    init() {
        self.owner = sender();
    }

    get fun documentsNumber(): Int {
        return self.documentsNumber;
    }

    get fun currentCommissionPercentage(): Int {
        return self.commissionPercentage;
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
            body:
                DeclareDocumentWithComission{
                    document: msg.document,
                    commissionPercentage: self.commissionPercentage
                }.toCell(),
            value: context().value,
            code: init.code,
            data: init.data
        });
    }

    receive(msg: SetCommissionPercentage) {
        require(self.owner == sender(), "Only owner can set the commission percentage");
        require(msg.commissionPercentage >= 0, "Commission percentage can't be less than 0");
        require(msg.commissionPercentage <= 100, "Commission percentage can't be greater than 100");

        if (msg.documentAddress == null) {
            self.commissionPercentage = msg.commissionPercentage;

            send(SendParameters{
                to: sender(),
                value: context().value,
                mode: SendIgnoreErrors,
                body: "The Autoproof commission was updated".asComment(),
            });
        } else {
            send(SendParameters{
                to: msg.documentAddress!!,
                value: context().value,
                mode: SendIgnoreErrors,
                body:msg.toCell()
            });
        }
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
