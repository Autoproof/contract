import { toNano } from "@ton/core";
import { ContractExecutor, ContractSystem, randomAddress } from "@tact-lang/emulator";
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
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
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

        let authorship = `Pinsteps Team. ipolo.box@gmail.com. Autoproof.dev. Israel
Haifa
Netive Hen 1
22`;

        await contract.send(
            author,
            { value: toNano(1) },
            {
                $$type: "DeclareDocument",
                document: {
                    $$type: "DocumentData",
                    authorship: authorship,
                    description: "This is test screenshot",
                    rootHash: "7ec9608ffbbabd5ed6c9e50b3944265de8230f3d435adb64b4aaea652217c1c6",
                    data: `Screenshot 2024-06-23 at 00.43.58.png:34b421dedd1843da19a7f63b682abcbda87f26d412746cdfb93d715003b03323
  Screenshot 2024-06-23 at 00.43.56.png:8036c9bb29bf69ca00aa816097849bb39d31242aea9087c93f54bcd9ed5d7518`,
                    tags: "",
                },
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

        let dn = await contract.getDocumentsNumber();
        // console.log(dn);
        expect(dn).toEqual(0n);

        await system.run();

        let documentAddress = await contract.getDocumentAddress(1n, author.address);

        await system.run();

        expect(track.collect()).toMatchInlineSnapshot(`[]`);

        let documentContract = system.open(Document.fromAddress(documentAddress));
        let documentTrack = system.track(documentContract);
        expect(documentTrack.collect()).toMatchInlineSnapshot(`[]`);

        await documentContract.send(author, { value: toNano("0.01") }, { $$type: "SetCost", cost: toNano("0.1") });

        await system.run();
        expect(documentTrack.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 0,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{9121B3AFA02FAF0804_}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "@treasure(author)",
                      "to": "kQBHyhUlV3ZmRuK7xIH7X04tf6y8-mRWyQkt7DFrbKAAFMas",
                      "type": "internal",
                      "value": "0.01",
                    },
                  },
                  {
                    "$type": "skipped",
                    "reason": "no-state",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "cell": "x{FFFFFFFF9121B3AFA02FAF0804_}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "kQBHyhUlV3ZmRuK7xIH7X04tf6y8-mRWyQkt7DFrbKAAFMas",
                      "to": "@treasure(author)",
                      "type": "internal",
                      "value": "0.009",
                    },
                  },
                ],
              },
            ]
        `);

        expect(author.address).toEqual(await documentContract.getAuthor());
        // console.log(track.collect()[0].events[0]);
        //         expect(track.collect()).toMatchInlineSnapshot(`
        //             [
        //               {
        //                 "$seq": 1,
        //                 "events": [
        //                   {
        //                     "$type": "received",
        //                     "message": {
        //                       "body": {
        //                         "cell": "x{B2DFBA6E8010109D8A04FE4BEBEFB35F325C14F2974E6EDB9C7DB60A5BCB7CFD667A99F319F_}
        //              x{50696E7374657073205465616D2E2069706F6C6F2E626F7840676D61696C2E636F6D2E204175746F70726F6F662E6465762E2049737261656C0A48616966610A4E65746976652048656E20310A3232}
        //              x{32346333623863313030626435343161653665343861633561393234623563663436653933353737306264396662616436303561633037646164323033616630}
        //              x{5468697320697320746573742073637265656E73686F74}
        //              x{}
        //               x{37656339363038666662626162643565643663396535306233393434323635646538323330663364343335616462363462346161656136353232313763316336}
        //               x{53637265656E73686F7420323032342D30362D32332061742030302E34332E35382E706E673A333462343231646564643138343364613139613766363362363832616263626461383766323664343132373436636466623933643731353030336230333332330A53637265656E73686F7420323032342D30362D3233206174}
        //                x{2030302E34332E35362E706E673A38303336633962623239626636396361303061613831363039373834396262333964333132343261656139303837633933663534626364396564356437353138}
        //               x{}",
        //                         "type": "cell",
        //                       },
        //                       "bounce": true,
        //                       "from": "@treasure(owner)",
        //                       "to": "@main",
        //                       "type": "internal",
        //                       "value": "1",
        //                     },
        //                   },
        //                   {
        //                     "$type": "processed",
        //                     "gasUsed": 5875n,
        //                   },
        //                 ],
        //               },
        //             ]
        //         `);

        //         await contract.send(
        //             nonOwner,
        //             { value: toNano(1) },
        //             {
        //                 $$type: "DeclareDocument",
        //                 authorship: authorship,
        //                 authorshipHash: "24c3b8c100bd541ae6e48ac5a924b5cf46e935770bd9fbad605ac07dad203af0",
        //                 authorAddress: randomAddress(""),

        //                 description: "This is test screenshot",
        //                 rootHash: "7ec9608ffbbabd5ed6c9e50b3944265de8230f3d435adb64b4aaea652217c1c6",
        //                 data: `Screenshot 2024-06-23 at 00.43.58.png:34b421dedd1843da19a7f63b682abcbda87f26d412746cdfb93d715003b03323
        // Screenshot 2024-06-23 at 00.43.56.png:8036c9bb29bf69ca00aa816097849bb39d31242aea9087c93f54bcd9ed5d7518`,
        //                 tags: "",
        //             }
        //         );

        //         await system.run();
        //         expect(track.collect()).toMatchInlineSnapshot(`
        //             [
        //               {
        //                 "$seq": 2,
        //                 "events": [
        //                   {
        //                     "$type": "storage-charged",
        //                     "amount": "0.000000005",
        //                   },
        //                   {
        //                     "$type": "received",
        //                     "message": {
        //                       "body": {
        //                         "cell": "x{B2DFBA6E8010109D8A04FE4BEBEFB35F325C14F2974E6EDB9C7DB60A5BCB7CFD667A99F319F_}
        //              x{50696E7374657073205465616D2E2069706F6C6F2E626F7840676D61696C2E636F6D2E204175746F70726F6F662E6465762E2049737261656C0A48616966610A4E65746976652048656E20310A3232}
        //              x{32346333623863313030626435343161653665343861633561393234623563663436653933353737306264396662616436303561633037646164323033616630}
        //              x{5468697320697320746573742073637265656E73686F74}
        //              x{}
        //               x{37656339363038666662626162643565643663396535306233393434323635646538323330663364343335616462363462346161656136353232313763316336}
        //               x{53637265656E73686F7420323032342D30362D32332061742030302E34332E35382E706E673A333462343231646564643138343364613139613766363362363832616263626461383766323664343132373436636466623933643731353030336230333332330A53637265656E73686F7420323032342D30362D3233206174}
        //                x{2030302E34332E35362E706E673A38303336633962623239626636396361303061613831363039373834396262333964333132343261656139303837633933663534626364396564356437353138}
        //               x{}",
        //                         "type": "cell",
        //                       },
        //                       "bounce": true,
        //                       "from": "@treasure(non-owner)",
        //                       "to": "@main",
        //                       "type": "internal",
        //                       "value": "1",
        //                     },
        //                   },
        //                   {
        //                     "$type": "failed",
        //                     "errorCode": 132,
        //                     "errorMessage": "Access denied",
        //                   },
        //                   {
        //                     "$type": "sent-bounced",
        //                     "message": {
        //                       "body": {
        //                         "cell": "x{FFFFFFFFB2DFBA6E8010109D8A04FE4BEBEFB35F325C14F2974E6EDB9C7DB60A5BCB7CFD}",
        //                         "type": "cell",
        //                       },
        //                       "bounce": false,
        //                       "from": "@main",
        //                       "to": "@treasure(non-owner)",
        //                       "type": "internal",
        //                       "value": "0.994236",
        //                     },
        //                   },
        //                 ],
        //               },
        //             ]
        //         `);
    });
});
