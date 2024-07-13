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
    41504: { message: `Can't update without a claim` },
    44565: { message: `Only the exclusive rights have access` },
    46455: { message: `Document data can be declared only once` },
    48674: { message: `Only Autoproof is allowed to set the document data` },
    50544: { message: `Only exclusive rights owner or author of the claim can cancel` },
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
    {"name":"DocumentData","header":null,"fields":[{"name":"authorship","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"rootHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}},{"name":"tags","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"GetFunds","header":170958879,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetCommissionPercentage","header":3849317432,"fields":[{"name":"commissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"DeclareDocument","header":1278208621,"fields":[{"name":"document","type":{"kind":"simple","type":"DocumentData","optional":false}}]},
]

const Document_getters: ABIGetter[] = [
    {"name":"currentCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentCost","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"currentClaim","arguments":[],"returnType":{"kind":"simple","type":"ExclusiveRightsClaim","optional":true}},
    {"name":"author","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"exclusiveRightsOwner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"documentData","arguments":[],"returnType":{"kind":"simple","type":"DocumentData","optional":true}},
    {"name":"calculatedCommission","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Document_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeclareDocumentWithComission"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCost"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim-rights-transfer"}},
    {"receiver":"internal","message":{"kind":"text","text":"sent-documents"}},
    {"receiver":"internal","message":{"kind":"text","text":"viewed-documents"}},
    {"receiver":"internal","message":{"kind":"text","text":"approve"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeclareDocumentWithComission | SetCost | 'claim-rights-transfer' | 'sent-documents' | 'viewed-documents' | 'approve' | 'cancel' | SetCommissionPercentage | GetFunds) {
        
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
        if (message === 'approve') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
    
    async getCalculatedCommission(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('calculatedCommission', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}