import { TonClient, loadTransaction, Address, Cell } from "@ton/ton";
import { loadDocumentDeclaration } from "./output/autoproof_Autoproof";

(async () => {
    const client = new TonClient({
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TONCENTER_APIKEY ?? ""
    });

    // let transactions = await client.getTransactions(Address.parse(process.env.DEPLOYED_CONTRACT_ADDRESS ?? ""),
    //     { limit: 10, archival: true });

    let d = "te6cckECCAEAAR8AAeGIACGC3pkZ15Uo70QJ262MgPHBAz8dMUqHsGyyJdJx3KCyBMmpXJnNTOn5lMCUzDuoUpt5miavwXD4h+sWXLGBpFL5Lgk6zTCpulZuj1EtSRfU+p7mwvMhwzou5BTMgx4eEDFNTRi7NAthEAAAAGgAHAEEcGIADruFhqxBYJKMWr4/MNX9CFAeZA+QIFT/U/WN80LeF8igDk4cAAAAAAAAAAAAAAAAAAAGRvUSBwYFAgIABAMAAAAeW29iamVjdCBPYmplY3RdAIBjMDU1MmNlYTBmMTkyY2M5YjE1ZThmNDA5ZmVkZGRhOTljZWJlOTAxYzU2NDI5YWUxODY1MDhjN2UxZDY5MGZlAAh0ZXN0ABhhbGV4IGFkZHJlc3OmTAEO";

    // res.push((0, core_1.loadTransaction)(core_1.Cell.fromBoc(Buffer.from(r.data, 'base64'))[0].beginParse()));
    let c = Cell.fromBase64(d).hash().toString("hex");
    console.log(c);
    // console.log(c.inMessage?.body.asSlice());
    // console.log(loadDocumentDeclaration(c.asSlice()));
    // transactions.forEach(tx => {

    //     let txBody = undefined;
    //     try {
    //         txBody = loadDeclareDocument(tx.inMessage?.body.asSlice() ?? Cell.EMPTY.asSlice())
    //     } catch(e){
    //         // ignore
    //     }

    //     if (txBody != undefined) {
    //         console.log("Created at", tx.now, tx.hash().toString("base64"));
    //         console.log(txBody);
    //     }
    // });
  })();