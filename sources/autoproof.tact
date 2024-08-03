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

message SetTheNextAutoproof {
    contractAddress: Address?;
}

contract Autoproof with Deployable, Resumable {
    owner: Address;
    stopped: Bool; // we want to be able to stop the contract for upgrades
    documentsNumber: Int as uint256 = 0;
    commissions: Commissions;

    // In case we are upgrading the contract.
    // we set the next's version contract address
    // to redirect the transactions there.
    nextAutoproofAddress: Address?;

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

    receive(msg: DeclareDocument) {
        self.requireNotStopped();

        self.validateDeclaration(msg.document);
        self.documentsNumber = self.documentsNumber + 1;

        // If there is a next autoproof address
        // we redirect the transactions there
        if (self.nextAutoproofAddress != null)  {
            send(SendParameters{
                to: self.nextAutoproofAddress!!,
                body: msg.toCell(),
                value: context().value,
            });
        } else {
            let init: StateInit = initOf Document(myAddress(), self.documentsNumber, sender(), msg.document, self.commissions, msg.royaltyWalletAddress);
            send(SendParameters{
                to: contractAddress(init),
                body: "Deployed a document contract".asComment(),
                value: context().value,
                code: init.code,
                data: init.data
            });
        }
    }

    receive(msg: CancelDocumentClaim) {
        require(self.owner == sender(), "Only owner can cancel a document contract");

        send(SendParameters{
            to: msg.documentAddress,
            value: context().value,
            body: "cancel".asComment(),
        });
    }

    receive(msg: SetCommissions) {
        require(self.owner == sender(), "Only owner can set the commissions");

        validateCommissions(msg.commissions);

        if (msg.documentAddress == null) {
            self.commissions = msg.commissions;

            send(SendParameters{
                to: sender(),
                value: context().value,
                body: "The Autoproof commissions were updated".asComment(),
            });
        } else {
            send(SendParameters{
                to: msg.documentAddress!!,
                value: context().value,
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
            body: "Send funds to the owner".asComment(),
        });
    }

    receive(msg: SetTheNextAutoproof) {
        require(self.owner == sender(), "Only owner can set the next autoproof address");

        self.nextAutoproofAddress = msg.contractAddress;
        self.reply("The next Autoproof contract address was updated".asComment());
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
