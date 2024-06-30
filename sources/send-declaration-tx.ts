import { TonClient, WalletContractV4, internal, Address, beginCell } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { storeDeclareDocuments } from "./output/autoproof_Autoproof";
import declaration from "./declaration.json";

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

  // Create a bodyCell
  let bodyCell = beginCell();
  storeDeclareDocuments({
      $$type: "DeclareDocuments",
      authorship: declaration.authorship,
      description: declaration.description,
      rootHash: declaration.rootHash,
      data: declaration.data,
      tags: declaration.tags
  })(bodyCell);

  // Create a transfer
  let seqno: number = await walletContract.getSeqno();
  let transfer = walletContract.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [internal({
      value: '0.1',
      to: process.env.DEPLOYED_AUTOPROOF_ADDRESS ?? "",
      body: bodyCell.endCell()
    })]
  });

  // Send
  await walletContract.send(transfer);
})();