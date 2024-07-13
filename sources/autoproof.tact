import "@stdlib/stoppable";
import "@stdlib/ownable";
import "@stdlib/deploy";
import "./document.tact";
import "./common.tact";

// Contract for autoproof document claim mechanism.

message DeclareDocument {
    document: DocumentData;
    royaltyWalletAddress: Address?;
}

message CancelDocumentClaim {
    documentAddress: Address;
}

contract Autoproof with Deployable, Resumable {
    owner: Address;
    stopped: Bool; // we want to be able to stop the contract for upgrades
    documentsNumber: Int as uint256 = 0;
    commissions: Commissions;

    init() {
        self.owner = sender();
        self.stopped = false;
        self.commissions = Commissions {
            transfershipCommissionPercentage: 95, // 9.5% by default
            royaltyCommissionPercentage: 5 // 0.5% by default
        };
    }

    get fun documentsNumber(): Int {
        return self.documentsNumber;
    }

    get fun currentCommissions(): Commissions? {
        return self.commissions;
    }

    get fun currentTransfershipCommissionPercentage(): Int {
        return self.commissions.transfershipCommissionPercentage;
    }

    get fun currentRoyaltyCommissionPercentage(): Int {
        return self.commissions.royaltyCommissionPercentage;
    }

    get fun documentAddress(seqno: Int, author: Address): Address {
        return contractAddress(initOf Document(myAddress(), seqno, author));
    }

    receive(msg: DeclareDocument) {
        self.requireNotStopped();

        self.validateDeclaration(msg.document);
        self.documentsNumber = self.documentsNumber + 1;

        let init: StateInit = initOf Document(myAddress(), self.documentsNumber, sender());
        send(SendParameters{
            to: contractAddress(init),
            body:
                DeclareDocumentWithComission{
                    document: msg.document,
                    commissions: self.commissions,
                    royaltyWalletAddress: msg.royaltyWalletAddress
                }.toCell(),
            value: context().value,
            code: init.code,
            data: init.data
        });
    }

    receive(msg: CancelDocumentClaim) {
        require(self.owner == sender(), "Only owner can cancel a document contract");

        send(SendParameters{
            to: msg.documentAddress,
            value: context().value,
            mode: SendIgnoreErrors,
            body: "cancel".asComment(),
        });
    }

    receive(msg: SetCommissions) {
        require(self.owner == sender(), "Only owner can set the commissions");

        require(msg.commissions.transfershipCommissionPercentage >= 0, "Transfership commission percentage can't be less than 0");
        require(msg.commissions.transfershipCommissionPercentage <= 100, "Transfership commission percentage can't be greater than 100");
        require(msg.commissions.royaltyCommissionPercentage >= 0, "Royalty commission percentage can't be less than 0");
        require(msg.commissions.royaltyCommissionPercentage <= 100, "Royalty commission percentage can't be greater than 100");

        if (msg.documentAddress == null) {
            self.commissions = msg.commissions;

            send(SendParameters{
                to: sender(),
                value: context().value,
                mode: SendIgnoreErrors,
                body: "The Autoproof commissions were updated".asComment(),
            });
        } else {
            send(SendParameters{
                to: msg.documentAddress!!,
                value: context().value,
                mode: SendIgnoreErrors,
                body: msg.toCell()
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
