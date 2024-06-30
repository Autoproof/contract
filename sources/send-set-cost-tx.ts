import { TonClient, WalletContractV4, internal, beginCell, toNano } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { storeSetCost } from "./output/autoproof_Document";

(async () => {
  // Create Client
  const client = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    apiKey: process.env.TONCENTER_APIKEY ?? ""
  });

  // Generate new key
  let mnemonics = process.env.MNEMONICS_AUTHOR?.split(" ") ?? [];
  let keyPair = await mnemonicToPrivateKey(mnemonics);

  // Create wallet contract
  let workchain = 0;
  let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
  const walletContract = client.open(wallet);

  // Get balance
  let balance: bigint = await walletContract.getBalance();

  console.log(balance);

  // Create a bodyCell
  let seqno: number = await walletContract.getSeqno();
  let bodyCell = beginCell();
  storeSetCost({
      $$type: "SetCost",
      cost: toNano('0.1')
  })(bodyCell);

  // Create a transfer
  let transfer = walletContract.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [internal({
      value: '0.1',
      to: process.env.DEPLOYED_DOCUMENT_ADDRESS ?? "",
      body: bodyCell.endCell()
    })]
  });

  // Send
  let r = await walletContract.send(transfer);
  console.log(r);
})();