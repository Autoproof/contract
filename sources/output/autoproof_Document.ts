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

export type DeclareDocumentWithComission = {
    $$type: 'DeclareDocumentWithComission';
    document: DocumentData;
    commissionPercentage: bigint;
}

export function storeDeclareDocumentWithComission(src: DeclareDocumentWithComission) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3418026123, 32);
        b_0.store(storeDocumentData(src.document));
        b_0.storeUint(src.commissionPercentage, 256);
    };
}

export function loadDeclareDocumentWithComission(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3418026123) { throw Error('Invalid prefix'); }
    let _document = loadDocumentData(sc_0);
    let _commissionPercentage = sc_0.loadUintBig(256);
    return { $$type: 'DeclareDocumentWithComission' as const, document: _document, commissionPercentage: _commissionPercentage };
}

function loadTupleDeclareDocumentWithComission(source: TupleReader) {
    const _document = loadTupleDocumentData(source.readTuple());
    let _commissionPercentage = source.readBigNumber();
    return { $$type: 'DeclareDocumentWithComission' as const, document: _document, commissionPercentage: _commissionPercentage };
}

function storeTupleDeclareDocumentWithComission(source: DeclareDocumentWithComission) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleDocumentData(source.document));
    builder.writeNumber(source.commissionPercentage);
    return builder.build();
}

function dictValueParserDeclareDocumentWithComission(): DictionaryValue<DeclareDocumentWithComission> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeclareDocumentWithComission(src)).endCell());
        },
        parse: (src) => {
            return loadDeclareDocumentWithComission(src.loadRef().beginParse());
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

export type SetCommissionPercentage = {
    $$type: 'SetCommissionPercentage';
    commissionPercentage: bigint;
    documentAddress: Address | null;
}

export function storeSetCommissionPercentage(src: SetCommissionPercentage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3849317432, 32);
        b_0.storeUint(src.commissionPercentage, 256);
        b_0.storeAddress(src.documentAddress);
    };
}

export function loadSetCommissionPercentage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3849317432) { throw Error('Invalid prefix'); }
    let _commissionPercentage = sc_0.loadUintBig(256);
    let _documentAddress = sc_0.loadMaybeAddress();
    return { $$type: 'SetCommissionPercentage' as const, commissionPercentage: _commissionPercentage, documentAddress: _documentAddress };
}

function loadTupleSetCommissionPercentage(source: TupleReader) {
    let _commissionPercentage = source.readBigNumber();
    let _documentAddress = source.readAddressOpt();
    return { $$type: 'SetCommissionPercentage' as const, commissionPercentage: _commissionPercentage, documentAddress: _documentAddress };
}

function storeTupleSetCommissionPercentage(source: SetCommissionPercentage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.commissionPercentage);
    builder.writeAddress(source.documentAddress);
    return builder.build();
}

function dictValueParserSetCommissionPercentage(): DictionaryValue<SetCommissionPercentage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetCommissionPercentage(src)).endCell());
        },
        parse: (src) => {
            return loadSetCommissionPercentage(src.loadRef().beginParse());
        }
    }
}

export type DeclareDocument = {
    $$type: 'DeclareDocument';
    document: DocumentData;
}

export function storeDeclareDocument(src: DeclareDocument) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1278208621, 32);
        b_0.store(storeDocumentData(src.document));
    };
}

export function loadDeclareDocument(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1278208621) { throw Error('Invalid prefix'); }
    let _document = loadDocumentData(sc_0);
    return { $$type: 'DeclareDocument' as const, document: _document };
}

function loadTupleDeclareDocument(source: TupleReader) {
    const _document = loadTupleDocumentData(source.readTuple());
    return { $$type: 'DeclareDocument' as const, document: _document };
}

function storeTupleDeclareDocument(source: DeclareDocument) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleDocumentData(source.document));
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

 type Document_init_args = {
    $$type: 'Document_init_args';
    parent: Address;
    seqno: bigint;
    author: Address;
}

function initDocument_init_args(src: Document_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.seqno, 257);
        b_0.storeAddress(src.author);
    };
}

async function Document_init(parent: Address, seqno: bigint, author: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDocument_init_args({ $$type: 'Document_init_args', parent, seqno, author })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Document_errors: { [key: number]: { message: string } } = {
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
    10382: { message: `Commission percentage can't be less than 0` },
    14555: { message: `Exclusive rights transfer is not available` },
    14578: { message: `Commission percentage can't be greater than 100` },
    19061: { message: `Only exclusive rights owner can get funds` },
    19102: { message: `Transfer is in progress` },
    19201: { message: `Can't view documents if they are not sent` },
    21953: { message: `Not enough funds.` },
    23073: { message: `Can't approve if documents are not viewed` },
    28490: { message: `Authorship can't be empty` },
    29100: { message: `Only parent contract can set the commission percentage` },
    30316: { message: `Can't approve if documents are not sent` },
    30875: { message: `Only owner can set the commission percentage` },
    34015: { message: `Only owner can cancel a document contract` },
    40368: { message: `Contract stopped` },
    41504: { message: `Can't update without a claim` },
    44565: { message: `Only the exclusive rights have access` },
    46455: { message: `Document data can be declared only once` },
    48674: { message: `Only Autoproof is allowed to set the document data` },
    50544: { message: `Only exclusive rights owner or author of the claim can cancel` },
    53296: { message: `Contract not stopped` },
    53932: { message: `Can't cancel if documents were sent but not viewed` },
    59821: { message: `Description hash can't be empty` },
    61064: { message: `Data can't be empty` },
    61678: { message: `Only owner can get funds` },
    61716: { message: `Only the author of the claim have access` },
    62718: { message: `RootHash hash can't be empty` },
}

const Document_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetCost","header":2434905007,"fields":[{"name":"cost","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}}]},
    {"name":"ExclusiveRightsClaim","header":null,"fields":[{"name":"author","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sentDocuments","type":{"kind":"simple","type":"bool","optional":false}},{"name":"viewedDocuments","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeclareDocumentWithComission","header":3418026123,"fields":[{"name":"document","type":{"kind":"simple","type":"DocumentData","optional":false}},{"name":"commissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ClaimApproval","header":774961926,"fields":[{"name":"assignmentHash","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DocumentData","header":null,"fields":[{"name":"authorship","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"rootHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}},{"name":"tags","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"GetFunds","header":170958879,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetCommissionPercentage","header":3849317432,"fields":[{"name":"commissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"DeclareDocument","header":1278208621,"fields":[{"name":"document","type":{"kind":"simple","type":"DocumentData","optional":false}}]},
    {"name":"CancelDocumentClaim","header":614687775,"fields":[{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Document_getters: ABIGetter[] = [
    {"name":"currentCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentCost","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"currentClaim","arguments":[],"returnType":{"kind":"simple","type":"ExclusiveRightsClaim","optional":true}},
    {"name":"author","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"exclusiveRightsOwner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"documentData","arguments":[],"returnType":{"kind":"simple","type":"DocumentData","optional":true}},
    {"name":"assignmentHash","arguments":[],"returnType":{"kind":"simple","type":"string","optional":true}},
    {"name":"calculatedCommission","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Document_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeclareDocumentWithComission"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCost"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim-rights-transfer"}},
    {"receiver":"internal","message":{"kind":"text","text":"sent-documents"}},
    {"receiver":"internal","message":{"kind":"text","text":"viewed-documents"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimApproval"}},
    {"receiver":"internal","message":{"kind":"text","text":"cancel"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCommissionPercentage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetFunds"}},
]

export class Document implements Contract {
    
    static async init(parent: Address, seqno: bigint, author: Address) {
        return await Document_init(parent, seqno, author);
    }
    
    static async fromInit(parent: Address, seqno: bigint, author: Address) {
        const init = await Document_init(parent, seqno, author);
        const address = contractAddress(0, init);
        return new Document(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Document(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Document_types,
        getters: Document_getters,
        receivers: Document_receivers,
        errors: Document_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeclareDocumentWithComission | SetCost | 'claim-rights-transfer' | 'sent-documents' | 'viewed-documents' | ClaimApproval | 'cancel' | SetCommissionPercentage | GetFunds) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeclareDocumentWithComission') {
            body = beginCell().store(storeDeclareDocumentWithComission(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCost') {
            body = beginCell().store(storeSetCost(message)).endCell();
        }
        if (message === 'claim-rights-transfer') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'sent-documents') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'viewed-documents') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimApproval') {
            body = beginCell().store(storeClaimApproval(message)).endCell();
        }
        if (message === 'cancel') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCommissionPercentage') {
            body = beginCell().store(storeSetCommissionPercentage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetFunds') {
            body = beginCell().store(storeGetFunds(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCurrentCommissionPercentage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentCommissionPercentage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCurrentCost(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentCost', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getCurrentClaim(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentClaim', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleExclusiveRightsClaim(result_p) : null;
        return result;
    }
    
    async getAuthor(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('author', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getExclusiveRightsOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('exclusiveRightsOwner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getDocumentData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('documentData', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleDocumentData(result_p) : null;
        return result;
    }
    
    async getAssignmentHash(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('assignmentHash', builder.build())).stack;
        let result = source.readStringOpt();
        return result;
    }
    
    async getCalculatedCommission(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('calculatedCommission', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}