import { TonClient, WalletContractV4, internal, Address, beginCell } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { storeDeclareDocuments } from "./output/autoproof_AutoproofContract";
import declaration from "./declaration.json";

(async () => {
  // Create Client
  const client = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    apiKey: process.env.TONCENTER_APIKEY ?? ""
  });

  // Generate new key
  let mnemonics = process.env.MNEMONICS?.split(" ") ?? [];
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
  storeDeclareDocuments({
      $$type: "DeclareDocuments",
      authorship: declaration.authorship,
      authorshipHash: declaration.authorshipHash,
      authorAddress: Address.parse(declaration.authorAddress),

      description: declaration.description,
      rootHash: declaration.rootHash,
      data: declaration.data,
      tags: declaration.tags
  })(bodyCell);

  // Create a transfer
  let transfer = await walletContract.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [internal({
      value: '0.1',
      to: process.env.DEPLOYED_CONTRACT_ADDRESS ?? "",
      body: bodyCell.endCell()
    })]
  });

  // Send
  await walletContract.send(transfer);
})();