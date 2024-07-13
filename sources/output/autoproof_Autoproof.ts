import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ExclusiveRightsClaim = {
    $$type: 'ExclusiveRightsClaim';
    author: Address;
    amount: bigint;
    sentDocuments: boolean;
    viewedDocuments: boolean;
}

export function storeExclusiveRightsClaim(src: ExclusiveRightsClaim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.author);
        b_0.storeCoins(src.amount);
        b_0.storeBit(src.sentDocuments);
        b_0.storeBit(src.viewedDocuments);
    };
}

export function loadExclusiveRightsClaim(slice: Slice) {
    let sc_0 = slice;
    let _author = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _sentDocuments = sc_0.loadBit();
    let _viewedDocuments = sc_0.loadBit();
    return { $$type: 'ExclusiveRightsClaim' as const, author: _author, amount: _amount, sentDocuments: _sentDocuments, viewedDocuments: _viewedDocuments };
}

function loadTupleExclusiveRightsClaim(source: TupleReader) {
    let _author = source.readAddress();
    let _amount = source.readBigNumber();
    let _sentDocuments = source.readBoolean();
    let _viewedDocuments = source.readBoolean();
    return { $$type: 'ExclusiveRightsClaim' as const, author: _author, amount: _amount, sentDocuments: _sentDocuments, viewedDocuments: _viewedDocuments };
}

function storeTupleExclusiveRightsClaim(source: ExclusiveRightsClaim) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.author);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.sentDocuments);
    builder.writeBoolean(source.viewedDocuments);
    return builder.build();
}

function dictValueParserExclusiveRightsClaim(): DictionaryValue<ExclusiveRightsClaim> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExclusiveRightsClaim(src)).endCell());
        },
        parse: (src) => {
            return loadExclusiveRightsClaim(src.loadRef().beginParse());
        }
    }
}

export type SetCost = {
    $$type: 'SetCost';
    cost: bigint | null;
}

export function storeSetCost(src: SetCost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2434905007, 32);
        if (src.cost !== null && src.cost !== undefined) { b_0.storeBit(true).storeCoins(src.cost); } else { b_0.storeBit(false); }
    };
}

export function loadSetCost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2434905007) { throw Error('Invalid prefix'); }
    let _cost = sc_0.loadBit() ? sc_0.loadCoins() : null;
    return { $$type: 'SetCost' as const, cost: _cost };
}

function loadTupleSetCost(source: TupleReader) {
    let _cost = source.readBigNumberOpt();
    return { $$type: 'SetCost' as const, cost: _cost };
}

function storeTupleSetCost(source: SetCost) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.cost);
    return builder.build();
}

function dictValueParserSetCost(): DictionaryValue<SetCost> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetCost(src)).endCell());
        },
        parse: (src) => {
            return loadSetCost(src.loadRef().beginParse());
        }
    }
}

export type ClaimApproval = {
    $$type: 'ClaimApproval';
    assignmentHash: string;
}

export function storeClaimApproval(src: ClaimApproval) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(774961926, 32);
        b_0.storeStringRefTail(src.assignmentHash);
    };
}

export function loadClaimApproval(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 774961926) { throw Error('Invalid prefix'); }
    let _assignmentHash = sc_0.loadStringRefTail();
    return { $$type: 'ClaimApproval' as const, assignmentHash: _assignmentHash };
}

function loadTupleClaimApproval(source: TupleReader) {
    let _assignmentHash = source.readString();
    return { $$type: 'ClaimApproval' as const, assignmentHash: _assignmentHash };
}

function storeTupleClaimApproval(source: ClaimApproval) {
    let builder = new TupleBuilder();
    builder.writeString(source.assignmentHash);
    return builder.build();
}

function dictValueParserClaimApproval(): DictionaryValue<ClaimApproval> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimApproval(src)).endCell());
        },
        parse: (src) => {
            return loadClaimApproval(src.loadRef().beginParse());
        }
    }
}

export type DocumentData = {
    $$type: 'DocumentData';
    authorship: string;
    description: string;
    rootHash: string;
    data: string;
    tags: string;
}

export function storeDocumentData(src: DocumentData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.authorship);
        b_0.storeStringRefTail(src.description);
        b_0.storeStringRefTail(src.rootHash);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.data);
        b_1.storeStringRefTail(src.tags);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDocumentData(slice: Slice) {
    let sc_0 = slice;
    let _authorship = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _rootHash = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _data = sc_1.loadStringRefTail();
    let _tags = sc_1.loadStringRefTail();
    return { $$type: 'DocumentData' as const, authorship: _authorship, description: _description, rootHash: _rootHash, data: _data, tags: _tags };
}

function loadTupleDocumentData(source: TupleReader) {
    let _authorship = source.readString();
    let _description = source.readString();
    let _rootHash = source.readString();
    let _data = source.readString();
    let _tags = source.readString();
    return { $$type: 'DocumentData' as const, authorship: _authorship, description: _description, rootHash: _rootHash, data: _data, tags: _tags };
}

function storeTupleDocumentData(source: DocumentData) {
    let builder = new TupleBuilder();
    builder.writeString(source.authorship);
    builder.writeString(source.description);
    builder.writeString(source.rootHash);
    builder.writeString(source.data);
    builder.writeString(source.tags);
    return builder.build();
}

function dictValueParserDocumentData(): DictionaryValue<DocumentData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDocumentData(src)).endCell());
        },
        parse: (src) => {
            return loadDocumentData(src.loadRef().beginParse());
        }
    }
}

export type GetFunds = {
    $$type: 'GetFunds';
    amount: bigint;
}

export function storeGetFunds(src: GetFunds) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(170958879, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadGetFunds(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 170958879) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'GetFunds' as const, amount: _amount };
}

function loadTupleGetFunds(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'GetFunds' as const, amount: _amount };
}

function storeTupleGetFunds(source: GetFunds) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserGetFunds(): DictionaryValue<GetFunds> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetFunds(src)).endCell());
        },
        parse: (src) => {
            return loadGetFunds(src.loadRef().beginParse());
        }
    }
}

export type SetCommissions = {
    $$type: 'SetCommissions';
    commissions: Commissions;
    documentAddress: Address | null;
}

export function storeSetCommissions(src: SetCommissions) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1263034725, 32);
        b_0.store(storeCommissions(src.commissions));
        b_0.storeAddress(src.documentAddress);
    };
}

export function loadSetCommissions(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1263034725) { throw Error('Invalid prefix'); }
    let _commissions = loadCommissions(sc_0);
    let _documentAddress = sc_0.loadMaybeAddress();
    return { $$type: 'SetCommissions' as const, commissions: _commissions, documentAddress: _documentAddress };
}

function loadTupleSetCommissions(source: TupleReader) {
    const _commissions = loadTupleCommissions(source.readTuple());
    let _documentAddress = source.readAddressOpt();
    return { $$type: 'SetCommissions' as const, commissions: _commissions, documentAddress: _documentAddress };
}

function storeTupleSetCommissions(source: SetCommissions) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleCommissions(source.commissions));
    builder.writeAddress(source.documentAddress);
    return builder.build();
}

function dictValueParserSetCommissions(): DictionaryValue<SetCommissions> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetCommissions(src)).endCell());
        },
        parse: (src) => {
            return loadSetCommissions(src.loadRef().beginParse());
        }
    }
}

export type Commissions = {
    $$type: 'Commissions';
    transfershipCommissionPercentage: bigint;
    royaltyCommissionPercentage: bigint;
}

export function storeCommissions(src: Commissions) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.transfershipCommissionPercentage, 256);
        b_0.storeUint(src.royaltyCommissionPercentage, 256);
    };
}

export function loadCommissions(slice: Slice) {
    let sc_0 = slice;
    let _transfershipCommissionPercentage = sc_0.loadUintBig(256);
    let _royaltyCommissionPercentage = sc_0.loadUintBig(256);
    return { $$type: 'Commissions' as const, transfershipCommissionPercentage: _transfershipCommissionPercentage, royaltyCommissionPercentage: _royaltyCommissionPercentage };
}

function loadTupleCommissions(source: TupleReader) {
    let _transfershipCommissionPercentage = source.readBigNumber();
    let _royaltyCommissionPercentage = source.readBigNumber();
    return { $$type: 'Commissions' as const, transfershipCommissionPercentage: _transfershipCommissionPercentage, royaltyCommissionPercentage: _royaltyCommissionPercentage };
}

function storeTupleCommissions(source: Commissions) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.transfershipCommissionPercentage);
    builder.writeNumber(source.royaltyCommissionPercentage);
    return builder.build();
}

function dictValueParserCommissions(): DictionaryValue<Commissions> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommissions(src)).endCell());
        },
        parse: (src) => {
            return loadCommissions(src.loadRef().beginParse());
        }
    }
}

export type DeclareDocument = {
    $$type: 'DeclareDocument';
    document: DocumentData;
    royaltyWalletAddress: Address | null;
}

export function storeDeclareDocument(src: DeclareDocument) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1862651712, 32);
        b_0.store(storeDocumentData(src.document));
        b_0.storeAddress(src.royaltyWalletAddress);
    };
}

export function loadDeclareDocument(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1862651712) { throw Error('Invalid prefix'); }
    let _document = loadDocumentData(sc_0);
    let _royaltyWalletAddress = sc_0.loadMaybeAddress();
    return { $$type: 'DeclareDocument' as const, document: _document, royaltyWalletAddress: _royaltyWalletAddress };
}

function loadTupleDeclareDocument(source: TupleReader) {
    const _document = loadTupleDocumentData(source.readTuple());
    let _royaltyWalletAddress = source.readAddressOpt();
    return { $$type: 'DeclareDocument' as const, document: _document, royaltyWalletAddress: _royaltyWalletAddress };
}

function storeTupleDeclareDocument(source: DeclareDocument) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleDocumentData(source.document));
    builder.writeAddress(source.royaltyWalletAddress);
    return builder.build();
}

function dictValueParserDeclareDocument(): DictionaryValue<DeclareDocument> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeclareDocument(src)).endCell());
        },
        parse: (src) => {
            return loadDeclareDocument(src.loadRef().beginParse());
        }
    }
}

export type CancelDocumentClaim = {
    $$type: 'CancelDocumentClaim';
    documentAddress: Address;
}

export function storeCancelDocumentClaim(src: CancelDocumentClaim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(614687775, 32);
        b_0.storeAddress(src.documentAddress);
    };
}

export function loadCancelDocumentClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 614687775) { throw Error('Invalid prefix'); }
    let _documentAddress = sc_0.loadAddress();
    return { $$type: 'CancelDocumentClaim' as const, documentAddress: _documentAddress };
}

function loadTupleCancelDocumentClaim(source: TupleReader) {
    let _documentAddress = source.readAddress();
    return { $$type: 'CancelDocumentClaim' as const, documentAddress: _documentAddress };
}

function storeTupleCancelDocumentClaim(source: CancelDocumentClaim) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.documentAddress);
    return builder.build();
}

function dictValueParserCancelDocumentClaim(): DictionaryValue<CancelDocumentClaim> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelDocumentClaim(src)).endCell());
        },
        parse: (src) => {
            return loadCancelDocumentClaim(src.loadRef().beginParse());
        }
    }
}

export type SetTheNextAutoproof = {
    $$type: 'SetTheNextAutoproof';
    contractAddress: Address | null;
}

export function storeSetTheNextAutoproof(src: SetTheNextAutoproof) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1469863893, 32);
        b_0.storeAddress(src.contractAddress);
    };
}

export function loadSetTheNextAutoproof(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1469863893) { throw Error('Invalid prefix'); }
    let _contractAddress = sc_0.loadMaybeAddress();
    return { $$type: 'SetTheNextAutoproof' as const, contractAddress: _contractAddress };
}

function loadTupleSetTheNextAutoproof(source: TupleReader) {
    let _contractAddress = source.readAddressOpt();
    return { $$type: 'SetTheNextAutoproof' as const, contractAddress: _contractAddress };
}

function storeTupleSetTheNextAutoproof(source: SetTheNextAutoproof) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.contractAddress);
    return builder.build();
}

function dictValueParserSetTheNextAutoproof(): DictionaryValue<SetTheNextAutoproof> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetTheNextAutoproof(src)).endCell());
        },
        parse: (src) => {
            return loadSetTheNextAutoproof(src.loadRef().beginParse());
        }
    }
}

 type Autoproof_init_args = {
    $$type: 'Autoproof_init_args';
}

function initAutoproof_init_args(src: Autoproof_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Autoproof_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAutoproof_init_args({ $$type: 'Autoproof_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Autoproof_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3545: { message: `Tags can't be empty` },
    3861: { message: `Only author of the claim can approve` },
    5688: { message: `Only exclusive rights owner can set the cost` },
    7765: { message: `Can't approve without a claim` },
    7782: { message: `Can't cancel without a claim` },
    8086: { message: `Not enough funds` },
    11428: { message: `Royalty commission percentage can't be greater than 1000` },
    14555: { message: `Exclusive rights transfer is not available` },
    19061: { message: `Only exclusive rights owner can get funds` },
    19102: { message: `Transfer is in progress` },
    19201: { message: `Can't view documents if they are not sent` },
    19858: { message: `Only owner can set the commissions` },
    21449: { message: `Royalty commission percentage can't be less than 0` },
    21953: { message: `Not enough funds.` },
    23073: { message: `Can't approve if documents are not viewed` },
    23942: { message: `Transfership commission percentage can't be less than 0` },
    28490: { message: `Authorship can't be empty` },
    30316: { message: `Can't approve if documents are not sent` },
    31093: { message: `Only owner can set the next autoproof address` },
    31610: { message: `Transfership commission percentage can't be greater than 1000` },
    34015: { message: `Only owner can cancel a document contract` },
    40368: { message: `Contract stopped` },
    41504: { message: `Can't update without a claim` },
    44565: { message: `Only the exclusive rights have access` },
    48939: { message: `Only parent contract can set the commissions` },
    50544: { message: `Only exclusive rights owner or author of the claim can cancel` },
    53296: { message: `Contract not stopped` },
    53932: { message: `Can't cancel if documents were sent but not viewed` },
    59821: { message: `Description hash can't be empty` },
    61064: { message: `Data can't be empty` },
    61678: { message: `Only owner can get funds` },
    61716: { message: `Only the author of the claim have access` },
    62718: { message: `RootHash hash can't be empty` },
}

const Autoproof_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ExclusiveRightsClaim","header":null,"fields":[{"name":"author","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sentDocuments","type":{"kind":"simple","type":"bool","optional":false}},{"name":"viewedDocuments","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SetCost","header":2434905007,"fields":[{"name":"cost","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}}]},
    {"name":"ClaimApproval","header":774961926,"fields":[{"name":"assignmentHash","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DocumentData","header":null,"fields":[{"name":"authorship","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"rootHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}},{"name":"tags","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"GetFunds","header":170958879,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetCommissions","header":1263034725,"fields":[{"name":"commissions","type":{"kind":"simple","type":"Commissions","optional":false}},{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Commissions","header":null,"fields":[{"name":"transfershipCommissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"royaltyCommissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"DeclareDocument","header":1862651712,"fields":[{"name":"document","type":{"kind":"simple","type":"DocumentData","optional":false}},{"name":"royaltyWalletAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CancelDocumentClaim","header":614687775,"fields":[{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetTheNextAutoproof","header":1469863893,"fields":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":true}}]},
]

const Autoproof_getters: ABIGetter[] = [
    {"name":"documentsNumber","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentCommissions","arguments":[],"returnType":{"kind":"simple","type":"Commissions","optional":true}},
    {"name":"currentTransfershipCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentRoyaltyCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Autoproof_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeclareDocument"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelDocumentClaim"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCommissions"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetFunds"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetTheNextAutoproof"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class Autoproof implements Contract {
    
    static async init() {
        return await Autoproof_init();
    }
    
    static async fromInit() {
        const init = await Autoproof_init();
        const address = contractAddress(0, init);
        return new Autoproof(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Autoproof(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Autoproof_types,
        getters: Autoproof_getters,
        receivers: Autoproof_receivers,
        errors: Autoproof_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeclareDocument | CancelDocumentClaim | SetCommissions | GetFunds | SetTheNextAutoproof | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeclareDocument') {
            body = beginCell().store(storeDeclareDocument(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelDocumentClaim') {
            body = beginCell().store(storeCancelDocumentClaim(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCommissions') {
            body = beginCell().store(storeSetCommissions(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetFunds') {
            body = beginCell().store(storeGetFunds(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTheNextAutoproof') {
            body = beginCell().store(storeSetTheNextAutoproof(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getDocumentsNumber(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('documentsNumber', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCurrentCommissions(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentCommissions', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleCommissions(result_p) : null;
        return result;
    }
    
    async getCurrentTransfershipCommissionPercentage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentTransfershipCommissionPercentage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCurrentRoyaltyCommissionPercentage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentRoyaltyCommissionPercentage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}