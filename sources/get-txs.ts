import { TonClient, loadTransaction, Address, Cell } from "@ton/ton";

(async () => {
    const client = new TonClient({
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_APIKEY ?? ""
    });

    let transactions = await client.getTransactions(Address.parse(process.env.DEPLOYED_AUTOPROOF_ADDRESS ?? ""),
        { limit: 10,  archival: true });

    transactions.forEach(tx => {
        tx.outMessages.values().forEach(v => console.log(tx.hash().toString("hex"), v.info.dest)
        );


    });
  })();

          // let txBody = undefined;
        // try {
        //     txBody = loadDeclareDocument(tx.inMessage?.body.asSlice() ?? Cell.EMPTY.asSlice())
        // } catch(e){
        //     // ignore
        // }

        // if (txBody != undefined) {
        //     console.log("Created at", tx.now, tx.hash().toString("base64"));
        //     console.log(txBody);
        // }