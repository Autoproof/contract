import { toNano, beginCell } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { Autoproof } from "./output/autoproof_Autoproof";

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

})
