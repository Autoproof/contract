import { TonClient, Address, Cell } from "@ton/ton";
import { loadDeclareDocuments, loadTransferExclusiveRights } from "./output/autoproof_AutoproofContract";

(async () => {
    const client = new TonClient({
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_APIKEY ?? ""
    });

    let transactions = await client.getTransactions(Address.parse(process.env.DEPLOYED_CONTRACT_ADDRESS ?? ""),
        { limit: 10, archival: true });

    transactions.forEach(tx => {

        let txBody = undefined;
        try {
            txBody = loadDeclareDocuments(tx.inMessage?.body.asSlice() ?? Cell.EMPTY.asSlice())
        } catch(e){
            try {
                txBody = loadTransferExclusiveRights(tx.inMessage?.body.asSlice() ?? Cell.EMPTY.asSlice())
            } catch (e) {
                // ignore
            }
        }

        if (txBody != undefined) {
            console.log("Created at", tx.now, tx.hash().toString("base64"));
            console.log(txBody);
        }
    });
  })();