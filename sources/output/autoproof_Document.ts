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
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
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
    ownership: string;
    assignmentHash: string;
}

export function storeClaimApproval(src: ClaimApproval) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1066795098, 32);
        b_0.storeStringRefTail(src.ownership);
        b_0.storeStringRefTail(src.assignmentHash);
    };
}

export function loadClaimApproval(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1066795098) { throw Error('Invalid prefix'); }
    let _ownership = sc_0.loadStringRefTail();
    let _assignmentHash = sc_0.loadStringRefTail();
    return { $$type: 'ClaimApproval' as const, ownership: _ownership, assignmentHash: _assignmentHash };
}

function loadTupleClaimApproval(source: TupleReader) {
    let _ownership = source.readString();
    let _assignmentHash = source.readString();
    return { $$type: 'ClaimApproval' as const, ownership: _ownership, assignmentHash: _assignmentHash };
}

function storeTupleClaimApproval(source: ClaimApproval) {
    let builder = new TupleBuilder();
    builder.writeString(source.ownership);
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
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.rootHash);
        b_1.storeStringRefTail(src.data);
        b_1.storeStringRefTail(src.tags);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDocumentData(slice: Slice) {
    let sc_0 = slice;
    let _authorship = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _rootHash = sc_1.loadStringRefTail();
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

 type Document_init_args = {
    $$type: 'Document_init_args';
    parent: Address;
    seqno: bigint;
    author: Address;
    document: DocumentData;
    commissions: Commissions;
    royaltyWalletAddress: Address | null;
}

function initDocument_init_args(src: Document_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.seqno, 257);
        b_0.storeAddress(src.author);
        let b_1 = new Builder();
        b_1.store(storeDocumentData(src.document));
        b_1.store(storeCommissions(src.commissions));
        b_1.storeAddress(src.royaltyWalletAddress);
        b_0.storeRef(b_1.endCell());
    };
}

async function Document_init(parent: Address, seqno: bigint, author: Address, document: DocumentData, commissions: Commissions, royaltyWalletAddress: Address | null) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDocument_init_args({ $$type: 'Document_init_args', parent, seqno, author, document, commissions, royaltyWalletAddress })(builder);
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

const Document_types: ABIType[] = [
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
    {"name":"ClaimApproval","header":1066795098,"fields":[{"name":"ownership","type":{"kind":"simple","type":"string","optional":false}},{"name":"assignmentHash","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DocumentData","header":null,"fields":[{"name":"authorship","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"rootHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}},{"name":"tags","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"GetFunds","header":170958879,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetCommissions","header":1263034725,"fields":[{"name":"commissions","type":{"kind":"simple","type":"Commissions","optional":false}},{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Commissions","header":null,"fields":[{"name":"transfershipCommissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"royaltyCommissionPercentage","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"DeclareDocument","header":1862651712,"fields":[{"name":"document","type":{"kind":"simple","type":"DocumentData","optional":false}},{"name":"royaltyWalletAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CancelDocumentClaim","header":614687775,"fields":[{"name":"documentAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetTheNextAutoproof","header":1469863893,"fields":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":true}}]},
]

const Document_getters: ABIGetter[] = [
    {"name":"currentCommissions","arguments":[],"returnType":{"kind":"simple","type":"Commissions","optional":false}},
    {"name":"currentTransfershipCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentRoyaltyCommissionPercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"currentCost","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"currentClaim","arguments":[],"returnType":{"kind":"simple","type":"ExclusiveRightsClaim","optional":true}},
    {"name":"author","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"exclusiveRightsOwner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"documentData","arguments":[],"returnType":{"kind":"simple","type":"DocumentData","optional":false}},
    {"name":"assignmentHash","arguments":[],"returnType":{"kind":"simple","type":"string","optional":true}},
    {"name":"summedCommission","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"transfershipCommission","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"royaltyCommission","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const Document_getterMapping: { [key: string]: string } = {
    'currentCommissions': 'getCurrentCommissions',
    'currentTransfershipCommissionPercentage': 'getCurrentTransfershipCommissionPercentage',
    'currentRoyaltyCommissionPercentage': 'getCurrentRoyaltyCommissionPercentage',
    'currentCost': 'getCurrentCost',
    'currentClaim': 'getCurrentClaim',
    'author': 'getAuthor',
    'exclusiveRightsOwner': 'getExclusiveRightsOwner',
    'documentData': 'getDocumentData',
    'assignmentHash': 'getAssignmentHash',
    'summedCommission': 'getSummedCommission',
    'transfershipCommission': 'getTransfershipCommission',
    'royaltyCommission': 'getRoyaltyCommission',
}

const Document_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetCost"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim-rights-transfer"}},
    {"receiver":"internal","message":{"kind":"text","text":"sent-documents"}},
    {"receiver":"internal","message":{"kind":"text","text":"viewed-documents"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimApproval"}},
    {"receiver":"internal","message":{"kind":"text","text":"cancel"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCommissions"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetFunds"}},
]

export class Document implements Contract {
    
    static async init(parent: Address, seqno: bigint, author: Address, document: DocumentData, commissions: Commissions, royaltyWalletAddress: Address | null) {
        return await Document_init(parent, seqno, author, document, commissions, royaltyWalletAddress);
    }
    
    static async fromInit(parent: Address, seqno: bigint, author: Address, document: DocumentData, commissions: Commissions, royaltyWalletAddress: Address | null) {
        const init = await Document_init(parent, seqno, author, document, commissions, royaltyWalletAddress);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetCost | 'claim-rights-transfer' | 'sent-documents' | 'viewed-documents' | ClaimApproval | 'cancel' | SetCommissions | GetFunds) {
        
        let body: Cell | null = null;
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCommissions') {
            body = beginCell().store(storeSetCommissions(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetFunds') {
            body = beginCell().store(storeGetFunds(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCurrentCommissions(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('currentCommissions', builder.build())).stack;
        const result = loadTupleCommissions(source.readTuple());
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
        const result = loadTupleDocumentData(source.readTuple());
        return result;
    }
    
    async getAssignmentHash(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('assignmentHash', builder.build())).stack;
        let result = source.readStringOpt();
        return result;
    }
    
    async getSummedCommission(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('summedCommission', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTransfershipCommission(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('transfershipCommission', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getRoyaltyCommission(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royaltyCommission', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}