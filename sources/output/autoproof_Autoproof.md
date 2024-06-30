# TACT Compilation Report
Contract: Autoproof
BOC Size: 1378 bytes

# Types
Total Types: 13

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## DeclareDocuments
TLB: `declare_documents#0646f512 authorship:^string description:^string rootHash:^string data:^string tags:^string = DeclareDocuments`
Signature: `DeclareDocuments{authorship:^string,description:^string,rootHash:^string,data:^string,tags:^string}`

## DocumentDeclaration
TLB: `document_declaration#8ea29cef address:address = DocumentDeclaration`
Signature: `DocumentDeclaration{address:address}`

## GetFunds
TLB: `get_funds#0a30a01f amount:coins = GetFunds`
Signature: `GetFunds{amount:coins}`

## SetCost
TLB: `set_cost#9121b3af cost:Maybe coins = SetCost`
Signature: `SetCost{cost:Maybe coins}`

## ExclusiveRightsClaim
TLB: `_ author:address amount:coins sentDocuments:bool viewedDocuments:bool = ExclusiveRightsClaim`
Signature: `ExclusiveRightsClaim{author:address,amount:coins,sentDocuments:bool,viewedDocuments:bool}`

# Get Methods
Total Get Methods: 3

## documentsNumber

## documentAddress
Argument: seqno
Argument: author

## owner

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
3861: Only author of the claim can approve
5688: Only exclusive rights owner can set the cost
7765: Can't approve without a claim
7782: Can't cancel without a claim
8086: Not enough funds
12393: Data hash can't be empty
14555: Exclusive rights transfer is not available
19061: Only exclusive rights owner can get funds
19102: Transfer is in progress
19201: Can't view documents if they are not sent
21953: Not enough funds.
23073: Can't approve if documents are not viewed
28490: Authorship can't be empty
30316: Can't approve if documents are not sent
35980: Can't get funds during the transfer
41504: Can't update without a claim
44565: Only the exclusive rights have access
50544: Only exclusive rights owner or author of the claim can cancel
53932: Can't cancel if documents were sent but not viewed
59821: Description hash can't be empty
61678: Only owner can get funds
61716: Only the author of the claim have access
62718: RootHash hash can't be empty