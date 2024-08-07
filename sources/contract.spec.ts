import { toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { Autoproof } from "./output/autoproof_Autoproof";
import { Document } from "./output/autoproof_Document";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let contract = system.open(await Autoproof.fromInit());
        system.name(contract.address, "main");
        let track = system.track(contract);
        await contract.send(owner, { value: toNano(0.5) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 0,
                "events": [
                  {
                    "$type": "deploy",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "Deploy",
                          "queryId": 0n,
                        },
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "@main",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 7737n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "DeployOk",
                            "queryId": 0n,
                          },
                        },
                        "bounce": false,
                        "from": "@main",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.991067",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        let author = system.treasure("author");

        await contract.send(
            author,
            { value: toNano(0.5) },
            {
                $$type: "DeclareDocument",
                document: {
                    $$type: "DocumentData",
                    author: {
                      $$type: "PersonDetails",
                      name: "Name",
                      address: "Address"
                    },
                    title: "Meme",
                    description: null,
                    rootHash: "7ec9608ffbbabd5ed6c9e50b3944265de8230f3d435adb64b4aaea652217c1c6",
                    data: `Screenshot 2024-06-23 at 00.43.58.png:34b421dedd1843da19a7f63b682abcbda87f26d412746cdfb93d715003b03323`,
                    tags: null,
                    
                },
                royaltyWalletAddress: null
            }
        );

        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 1,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{4C2FEA6D}
             x{50696E7374657073205465616D2E2069706F6C6F2E626F7840676D61696C2E636F6D2E204175746F70726F6F662E6465762E2049737261656C0A48616966610A4E65746976652048656E20310A3232}
             x{5468697320697320746573742073637265656E73686F74}
             x{37656339363038666662626162643565643663396535306233393434323635646538323330663364343335616462363462346161656136353232313763316336}
             x{}
              x{53637265656E73686F7420323032342D30362D32332061742030302E34332E35382E706E673A333462343231646564643138343364613139613766363362363832616263626461383766323664343132373436636466623933643731353030336230333332330A202053637265656E73686F7420323032342D30362D323320}
               x{61742030302E34332E35362E706E673A38303336633962623239626636396361303061613831363039373834396262333964333132343261656139303837633933663534626364396564356437353138}
              x{}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "@treasure(author)",
                      "to": "@main",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "failed",
                    "errorCode": 3545,
                    "errorMessage": "Tags can't be empty",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "cell": "x{FFFFFFFF4C2FEA6D}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "@main",
                      "to": "@treasure(author)",
                      "type": "internal",
                      "value": "0.988772",
                    },
                  },
                ],
              },
            ]
        `);
});
});
