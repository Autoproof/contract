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
    const __system = Cell.fromBase64('te6cckECbQEAEdMAAQHAAQIBIAI4AQW/TPQDART/APSkE/S88sgLBAIBYgUfA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCCyPhDAcx/AcoAVXDbPMntVDIGHALw7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEMu68Iu6jkww0x8BghDLuvCLuvLggdQB0AHUAdAB1AHQAdQB0NQB0AHUMNAQJRAkECMF0/9QZmwWMIIAviL4QlLgxwXy9IIAtXcGbhby9FUDbwV/4CCCEJEhs6+64wIgBwkCajDTHwGCEJEhs6+68uCB0gABkvoAkm0B4gExNYEWOPhCI8cF8vSBSp4kbvL0iPhCAX9t2zx/CFAAJgAAAABDb3N0IGlzIHVwZGF0ZWQD9IIQ5W/sOLqPbzDTHwGCEOVv7Di68uCB0/8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeISbBIwNoFxrPhCKccF8vSBKI4mwv/y9IE48ibBZfL0+EL4QW8kE18Dcoh/VTBtbds8f+AgClELAFIAAAAAVGhlIGRvY3VtZW50J3MgY29tbWlzc2lvbiB3YXMgdXBkYXRlZAO0ghAKMKAfuo9JMNMfAYIQCjCgH7ry4IH6AAExgUp1+EIkxwXy9CRukXCcJCBu8tCAbyQQI18D4oEflvgnbxBYoSK88vT4QnKIECN/VTBtbds8f+DAAJEw4w1wDFENAFwAAAAAUmV0dXJuIGZ1bmRzIHRvIHRoZSBleGNsdXNpdmUgcmlnaHRzIG93bmVyAur5ASCC8ItlnO/5pqPCCqMae7h4o6BPuLdY8Aechp8PT7fQcbFOuo7LMIE42yVus/L0gVXB+EFvJBNfAyYgbvLQgBB6EGkQWBBKEDlIqds8GqAavBfy9IFKngFu8vT4QvhBbyQTXwNwcG8EEEcQNlUif9sx4CA2DgPGgvC58boSDLK6QU3G5Gq4AcKfoTxNfx6Rcm9j9V7AsWixA7qPPDCCAKIgJG6z8vSCAK4V+EIjxwXy9CMgbvLQgG8kXwMEIG7y0IBvJBAjXwMUf3BvBIgU+EIBf23bPH/bMeAgD1AQAEAAAAAARG9jdW1lbnRzIGFyZSBtYXJrZWQgYXMgc2VudAP4gvBlVxuHyhA1yQaAT/vIM0H0tP06Su1HTAX2+nDUWrXlSbqPVTCCAKIgJG6z8vSCAPEU+EIlIG7y0IBvJF8DxwXy9IFLASQgbvLQgG8kE18D8vQjIG7y0IBvJF8DBCBu8tCAbyQQI18DFH9/bwSIFPhCAX9t2zx/2zHgIBFQEgBEAAAAAERvY3VtZW50cyBhcmUgbWFya2VkIGFzIHZpZXdlZAKugvAgiL7V6xUJjbMaeJsTiIcimHTq81WQs8qFUMTzAJIWNLqOhjDbPH/bMeCC8FjjVtU86h7FOmNaIZHS8v+tTyJ0rwEHmzPk6IKVFnrEuo6F2zx/2zHgExgEuIEeVSRus/L0gXZsJCBu8tCAbyQTXwPy9IFaISQgbvLQgG8kbDHy9IEPFSQgbvLQgG8kXwP4QscF8vQjIG7y0IBvJBAjXwNyiCRVIH9VMG1t2zwnVXDbPDIzM3ByFFE2FQBYAAAAAFNlbmQgZnVuZHMgdG8gdGhlIGV4Y2x1c2l2ZSByaWdodHMgb3duZXIEOIgQSRA1ECQQI21t2zz4Qm1tiBB4EGcQVkVAQzAWURdPAEAAAAAAU2VuZCBjb21taXNzaW9uIHRvIEF1dG9wcm9vZgAqAAAAAENsYWltIGlzIGFwcHJvdmVkA/KBHmYkbrPy9IIAxXD4QlIwxwWRf54kIG7y0IBvJF8D+ELHBeLy9IIA0qwkIG7y0IBvJBNfA8AAkX+OGSQgbvLQgG8kE18DmiQgbvLQgG8kbDGRcOLi8vQjIG7y0IBvJF8DJCBu8tCAbyQQI18DVXHbPDRQg6ByiBA6NhkaAD4AAAAAUmV0dXJuIGZ1bmRzIHRvIHRoZSBjbGFpbWVyAzZ/VTBtbds8bYgQaBBXEEYQNRRDMPhCAX9t2zxRG1AAKgAAAABDbGFpbSBpcyBjYW5jZWxlZALoUIcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVy/8jbrOXfwHKABPL/5YzcFADygDiIW6zl38BygAB+gKUcDLKAOLIIm6zlTJwWMoA4w1YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMdHgBsfwHKAAIgbvLQgG8kEEVQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AhLKAMoAAMgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOOOH8BygABIG7y0IBvJchQBc8WyVAFzMhQA88WyVjMyFjPFskBzMjIUATPFslQA8zIWM8WyQHMyQHMlHAyygDiyQHMAgEgICYCASAhJAIBICIjAj224jtnm2eNkCQN0kYNsyQN3loQDeSt4LxEDdJGDbvQMmQCEbXo+2ebZ42QMDJsAhG7k32zzbPGyBgyJQACJAIBICcsAgFYKCkCPbGRds82zxsgSBukjBtmSBu8tCAbyRvBOIgbpIwbd6AyXgIBWCorAJSr0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopAIQqB7bPNs8bIEyNwIBSGctAgFYLjECASAvMABzp3caGrS4MzmdF5eotrK6tywbO7miIjKxoLGoIKg4rKk4NTeqHBqZMbMqshoqtKGjLDopMrM3OrI9QQIPp822ebZ42QMyWQIQqr3bPNs8bIEyNgLO7UTQ1AH4Y9IAAY6E2zxsGOD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzAD0VjbPDM1Adj6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/0gABktP/km0B4tIAAZL6AJJtAeLUAdDSAAGOKvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gDSANIAVTBvBJFt4gE0AOL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABjiDUAdAB1AHQAdQB0AHUAdDUAdAB1DDQECUQJBAjbBVvBZIwbeIQSBBHEEYQRQASbW1UEgFtQBNtAWgkbrOOrVR3ZVR3ZVR3aiBu8tCAgGSpBAcREAcQbxBeEE0QPEup2zxsgRKoGBcWFRRDMOBwNwAYJW6zliUgbvLQgOBwAQW8Cgw5ART/APSkE/S88sgLOgIBYjtTAuTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsoAEsv/y//J7VRqPATY7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEEwv6m26jq8w0x8BghBML+ptuvLggdQB0AHUAdAB1AHQAdQB0NQB0AHUMNAQJRAkECNsFds8f+AgghDlb+w4uuMCIIIQCjCgH7rjAiCCEJRqmLa6PUBERgTEEDhHZds8VHSHU5jbPAGk+EP4KPhCUjDbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBBHEDtKmCdNPlw/AKSBb0qLCFAGAfkBAfkBvRXy9IIA6a2LCFAEAfkBAfkBvRPy9IIA9P6LCFgB+QEB+QG98vSCAO6IiwhYAfkBAfkBvfL0gQ3ZiwhYAfkBAfkBvfL0AajIVVCCEMu68ItQB8sfVUDIUAXPFslQBczIUAPPFslYzMhYzxbJAczIyFAEzxbJUAPMyFjPFskBzMkBzMv/yfhBbyQTXwMQRUA2F38FBHBBM9s8QTBRAYAw0x8BghDlb+w4uvLggdP/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iEmwSQQLmgXib+EInxwXy9IEojiLC//L0gTjyIsFl8vQgbo7SICBu8tCA+EFvJBNfAwNyA8hZghDlb+w4UAPLH8v/ASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyUMwf1UwbW3bPOMNf1FCAigwMfhC+EFvJBNfA3KIf1UwbW3bPENRAFAAAAAAVGhlIEF1dG9wcm9vZiBjb21taXNzaW9uIHdhcyB1cGRhdGVkAmww0x8BghAKMKAfuvLggfoAATGCAPDu+EImxwXy9IEflvgnbxAivPL0+EJyiBAjf1UwbW3bPH9FUQA2AAAAAFNlbmQgZnVuZHMgdG8gdGhlIG93bmVyAmSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcFBHArT5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeBISwQQ2zzbPDJwiBNMSUpPAA6CANAwI/L0ABYAAAAAUmVzdW1lZAQQ2zzbPDJ/iBNMTU5PABL4QlJAxwXy4IQAEIIAnbAjs/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPFABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8UQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wBSAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgVF8CASBVXQIBIFZXAhG1obtnm2eNiDBqWQIBSFhaAhGsve2ebZ42IMBqWQACIgJNramQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qie2eNiDAalsBkPhD+Cha2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFwA5APQ9AQwbQGBaZ4BgBD0D2+h8uCHAYFpniICgBD0F8gByPQAyQHMcAHKAFUgBFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQIRuFHds82zxsQYal4AAiMCASBgZQIB52FjAdyr0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwo+kC+W2BVCOi7wR2zmvRy4JwkTBoZqbopDZ+4Ee+BVGPiWIAJIJwQM51aecV+dJQsB1hbiZHsgIQqB7bPNs8bEFqZAACIAIBIGZpAgEgZ2gAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtZE4yNEtmOXB6NGI4bUc5eUhRSGdZYjljcW01UHlKY2Y0alJjR0I3TkpZRkaCACEbeCO2ebZ42IMGpsAYrtRNDUAfhj0gABjir6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0//T/1UwbBTgMPgo1wsKgwm68uCJ2zxrAA5wevhCAnACAAIhddYSug==');
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

const Autoproof_types: ABIType[] = [
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
    {"name":"DocumentData","header":null,"fields":[{"name":"authorship","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"rootHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}},{"name":"tags","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"GetFunds","header":170958879,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetCommissionPercentage","header":3849317432,"fields":[{"name":"commissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"DeclareDocument","header":1278208621,"fields":[{"name":"document","type":{"kind":"simple","type":"DocumentData","optional":false}}]},
]

const Autoproof_getters: ABIGetter[] = [
    {"name":"isStopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"documentsNumber","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"documentAddress","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"author","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Autoproof_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeclareDocument"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCommissionPercentage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetFunds"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeclareDocument | SetCommissionPercentage | GetFunds | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeclareDocument') {
            body = beginCell().store(storeDeclareDocument(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCommissionPercentage') {
            body = beginCell().store(storeSetCommissionPercentage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetFunds') {
            body = beginCell().store(storeGetFunds(message)).endCell();
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
    
    async getIsStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('isStopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getDocumentsNumber(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('documentsNumber', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCurrentCommissionPercentage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentCommissionPercentage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDocumentAddress(provider: ContractProvider, seqno: bigint, author: Address) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        builder.writeAddress(author);
        let source = (await provider.get('documentAddress', builder.build())).stack;
        let result = source.readAddress();
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