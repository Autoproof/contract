import { toNano, beginCell, Address } from "@ton/core"
import { Blockchain } from "@ton/sandbox"
import "@ton/test-utils"
import { Autoproof } from "./output/autoproof_Autoproof"
import { Document } from "./output/autoproof_Document"
import { findErrorCodeByMessage } from "./utils/error"

describe("contract", () => {
    it("should deploy correctly", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let contract = system.openContract(await Autoproof.fromInit());
        const deployResult = await contract.send(owner.getSender(), { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            deploy: true,
            success: true,
        });

        const s = await contract.getOwner()
        expect(s.toString()).toEqual(owner.address.toString());
    })

    it("should set commissions correctly", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let contract = system.openContract(await Autoproof.fromInit());
        await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, { $$type: "Deploy", queryId: 0n });
        
      await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, "Resume")

      const setCommsResult = await contract.send(owner.getSender(), { value: toNano(1) },
        { $$type: "SetCommissions",
          commissions:
            { $$type: "Commissions"
            , transfershipCommissionPercentage: 90n
            , royaltyCommissionPercentage: 10n
            },
          documentAddress: null
         })

      expect(setCommsResult.transactions).toHaveTransaction({
            from: contract.address,
            to: owner.address,
            success: true,
            body: beginCell().storeUint(0,32).storeStringTail("The Autoproof commissions were updated").endCell()
        });

      const comms = await contract.getCurrentCommissions()
      expect(comms!.transfershipCommissionPercentage).toEqual(90n)
      expect(comms!.royaltyCommissionPercentage).toEqual(10n)
    })


    it("should deploy document contract", async () => {
        let system = await Blockchain.create();                                                                        
        let owner = await system.treasury("owner");
        let contract = system.openContract(await Autoproof.fromInit());
        await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, { $$type: "Deploy", queryId: 0n });
        
      await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, "Resume")

      const declResult = await contract.send(owner.getSender(), { value: toNano(1) },
        { $$type: "DeclareDocument",
          royaltyWalletAddress: null,
          document:
            { $$type: "DocumentData",
              author: {
                $$type: "PersonDetails",
                name: "name",
                address: "address"
              },
              title: "document",
              rootHash: "hash",
              data: "data",
              tags: null,
              description: null
            },
         })

      const documentContractAddress = declResult.transactions[1].outMessages.values()[0].info.dest

      let dc = system.openContract(Document.fromAddress(documentContractAddress as Address))

     const documentAuthor = await dc.getAuthor()
     expect(documentAuthor.toString()).toEqual(owner.address.toString())
    })

    it("should successfully approve", async () => {
        let system = await Blockchain.create();   
        let owner = await system.treasury("owner")
        let author = await system.treasury("author");
        let claimer = await system.treasury("claimer");

        let contract = system.openContract(await Autoproof.fromInit());
        await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, { $$type: "Deploy", queryId: 0n });
        
      await contract.send(owner.getSender(), { value: toNano(100), bounce: false }, "Resume")

      const declResult = await contract.send(author.getSender(), { value: toNano(10) },
        { $$type: "DeclareDocument",
          royaltyWalletAddress: null,
          document:
            { $$type: "DocumentData",
              author: {
                $$type: "PersonDetails",
                name: "name",
                address: "address"
              },
              title: "document",
              rootHash: "hash",
              data: "data",
              tags: null,
              description: null
            },
         })

      const documentContractAddress = declResult.transactions[1].outMessages.values()[0].info.dest

      let dc = system.openContract(Document.fromAddress(documentContractAddress as Address))

     // Set price
      await dc.send(author.getSender(), { value: toNano('0.1') }, {
        $$type: "SetPrice",
        price: toNano('2')
      })

    const price = await dc.getCurrentPrice()
    expect (price).toEqual(toNano('2'))

    // Claim document
    await dc.send(claimer.getSender(), { value: toNano('3') }, { $$type: "ClaimRequest", authorDetails: { $$type: "PersonDetails", name: "Claimer", address: "" } })

    await dc.send(author.getSender(), { value: toNano('0.05') }, 'mark-documents-as-sent')
    await dc.send(claimer.getSender(), { value: toNano('0.05') }, 'mark-documents-as-viewed')

    // approve
    await dc.send(claimer.getSender(), { value: toNano('0.5') }, {$$type: "ClaimApproval", assignmentHash: "hash"})
    
    const dcOwner = await dc.getExclusiveRightsOwner()

    expect(dcOwner.toString()).toEqual(claimer.address.toString())

  })


    it("should successfully reject", async () => {
        let system = await Blockchain.create();   
        let owner = await system.treasury("owner")
        let author = await system.treasury("author");
        let claimer = await system.treasury("claimer");

        let contract = system.openContract(await Autoproof.fromInit());
        await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, { $$type: "Deploy", queryId: 0n });
        
      await contract.send(owner.getSender(), { value: toNano(100), bounce: false }, "Resume")

      const declResult = await contract.send(author.getSender(), { value: toNano(10) },
        { $$type: "DeclareDocument",
          royaltyWalletAddress: null,
          document:
            { $$type: "DocumentData",
              author: {
                $$type: "PersonDetails",
                name: "name",
                address: "address"
              },
              title: "document",
              rootHash: "hash",
              data: "data",
              tags: null,
              description: null
            },
         })

      const documentContractAddress = declResult.transactions[1].outMessages.values()[0].info.dest

      let dc = system.openContract(Document.fromAddress(documentContractAddress as Address))

     // Set price
      await dc.send(author.getSender(), { value: toNano('0.1') }, {
        $$type: "SetPrice",
        price: toNano('2')
      })

    const price = await dc.getCurrentPrice()
    expect (price).toEqual(toNano('2'))

    // Claim document
    await dc.send(claimer.getSender(), { value: toNano('3') }, { $$type: "ClaimRequest", authorDetails: { $$type: "PersonDetails", name: "Claimer", address: "" } })

    await dc.send(author.getSender(), { value: toNano('0.05') }, 'mark-documents-as-sent')
    await dc.send(claimer.getSender(), { value: toNano('0.05') }, 'mark-documents-as-viewed')

    // Reject
    await dc.send(claimer.getSender(), { value: toNano('0.5') }, 'reject')
    
    const dcOwner = await dc.getExclusiveRightsOwner()

    expect(dcOwner.toString()).toEqual(author.address.toString())

  })


    it("should fail the claim", async () => {
        let system = await Blockchain.create();   
        let owner = await system.treasury("owner")
        let author = await system.treasury("author");
        let claimer = await system.treasury("claimer");

        let contract = system.openContract(await Autoproof.fromInit());
        await contract.send(owner.getSender(), { value: toNano(1), bounce: false }, { $$type: "Deploy", queryId: 0n });
        
      await contract.send(owner.getSender(), { value: toNano(100), bounce: false }, "Resume")

      const declResult = await contract.send(author.getSender(), { value: toNano(10) },
        { $$type: "DeclareDocument",
          royaltyWalletAddress: null,
          document:
            { $$type: "DocumentData",
              author: {
                $$type: "PersonDetails",
                name: "name",
                address: "address"
              },
              title: "document",
              rootHash: "hash",
              data: "data",
              tags: null,
              description: null
            },
         })

      const documentContractAddress = declResult.transactions[1].outMessages.values()[0].info.dest

      let dc = system.openContract(Document.fromAddress(documentContractAddress as Address))

     // Set price
      await dc.send(author.getSender(), { value: toNano('0.1') }, {
        $$type: "SetPrice",
        price: toNano('2')
      })

    const price = await dc.getCurrentPrice()
    expect (price).toEqual(toNano('2'))

    // Claim document
    const claimResult = await dc.send(claimer.getSender(), { value: toNano('2') }, { $$type: "ClaimRequest", authorDetails: { $$type: "PersonDetails", name: "Claimer", address: "" } })

    const errorCodeForNotEnoughFunds = findErrorCodeByMessage(dc.abi.errors, "Not enough funds.");

    expect(claimResult.transactions).toHaveTransaction({
      from: claimer.address,
      to: dc.address,
      success: false,
      exitCode: errorCodeForNotEnoughFunds!!
    })
  })


})
