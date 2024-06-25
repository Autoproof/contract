import { TonClient, Address, Cell } from "@ton/ton";
import { loadSignDocuments } from "./output/autoproof_AutoproofContract";

(async () => {
    const client = new TonClient({
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_APIKEY ?? ""
    });

    let transactions = await client.getTransactions(Address.parse(process.env.DEPLOYED_CONTRACT_ADDRESS ?? ""), { limit: 10 });

    transactions.forEach(tx => {
        try {
            console.log("Created at", tx.now);

            let document = loadSignDocuments(tx.inMessage?.body.asSlice() ?? Cell.EMPTY.asSlice())
            console.log(document);
        } catch(e){
            // ignore
        }
    });
  })();