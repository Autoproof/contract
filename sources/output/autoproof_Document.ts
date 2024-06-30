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

export type DeclareDocuments = {
    $$type: 'DeclareDocuments';
    authorship: string;
    description: string;
    rootHash: string;
    data: string;
    tags: string;
}

export function storeDeclareDocuments(src: DeclareDocuments) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(105313554, 32);
        b_0.storeStringRefTail(src.authorship);
        b_0.storeStringRefTail(src.description);
        b_0.storeStringRefTail(src.rootHash);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.data);
        b_1.storeStringRefTail(src.tags);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeclareDocuments(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 105313554) { throw Error('Invalid prefix'); }
    let _authorship = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _rootHash = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _data = sc_1.loadStringRefTail();
    let _tags = sc_1.loadStringRefTail();
    return { $$type: 'DeclareDocuments' as const, authorship: _authorship, description: _description, rootHash: _rootHash, data: _data, tags: _tags };
}

function loadTupleDeclareDocuments(source: TupleReader) {
    let _authorship = source.readString();
    let _description = source.readString();
    let _rootHash = source.readString();
    let _data = source.readString();
    let _tags = source.readString();
    return { $$type: 'DeclareDocuments' as const, authorship: _authorship, description: _description, rootHash: _rootHash, data: _data, tags: _tags };
}

function storeTupleDeclareDocuments(source: DeclareDocuments) {
    let builder = new TupleBuilder();
    builder.writeString(source.authorship);
    builder.writeString(source.description);
    builder.writeString(source.rootHash);
    builder.writeString(source.data);
    builder.writeString(source.tags);
    return builder.build();
}

function dictValueParserDeclareDocuments(): DictionaryValue<DeclareDocuments> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeclareDocuments(src)).endCell());
        },
        parse: (src) => {
            return loadDeclareDocuments(src.loadRef().beginParse());
        }
    }
}

export type DocumentDeclaration = {
    $$type: 'DocumentDeclaration';
    address: Address;
}

export function storeDocumentDeclaration(src: DocumentDeclaration) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2393021679, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadDocumentDeclaration(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2393021679) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'DocumentDeclaration' as const, address: _address };
}

function loadTupleDocumentDeclaration(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'DocumentDeclaration' as const, address: _address };
}

function storeTupleDocumentDeclaration(source: DocumentDeclaration) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserDocumentDeclaration(): DictionaryValue<DocumentDeclaration> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDocumentDeclaration(src)).endCell());
        },
        parse: (src) => {
            return loadDocumentDeclaration(src.loadRef().beginParse());
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
    3861: { message: `Only author of the claim can approve` },
    5688: { message: `Only exclusive rights owner can set the cost` },
    7765: { message: `Can't approve without a claim` },
    7782: { message: `Can't cancel without a claim` },
    8086: { message: `Not enough funds` },
    12393: { message: `Data hash can't be empty` },
    14555: { message: `Exclusive rights transfer is not available` },
    19061: { message: `Only exclusive rights owner can get funds` },
    19102: { message: `Transfer is in progress` },
    19201: { message: `Can't view documents if they are not sent` },
    21953: { message: `Not enough funds.` },
    23073: { message: `Can't approve if documents are not viewed` },
    28490: { message: `Authorship can't be empty` },
    30316: { message: `Can't approve if documents are not sent` },
    41504: { message: `Can't update without a claim` },
    44565: { message: `Only the exclusive rights have access` },
    50544: { message: `Only exclusive rights owner or author of the claim can cancel` },
    53932: { message: `Can't cancel if documents were sent but not viewed` },
    59821: { message: `Description hash can't be empty` },
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
    {"name":"DeclareDocuments","header":105313554,"fields":[{"name":"authorship","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"rootHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}},{"name":"tags","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DocumentDeclaration","header":2393021679,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetFunds","header":170958879,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetCost","header":2434905007,"fields":[{"name":"cost","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}}]},
    {"name":"ExclusiveRightsClaim","header":null,"fields":[{"name":"author","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sentDocuments","type":{"kind":"simple","type":"bool","optional":false}},{"name":"viewedDocuments","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const Document_getters: ABIGetter[] = [
    {"name":"currentCost","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"currentClaim","arguments":[],"returnType":{"kind":"simple","type":"ExclusiveRightsClaim","optional":true}},
    {"name":"author","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"exclusiveRightsOwner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Document_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetCost"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim-rights-transfer"}},
    {"receiver":"internal","message":{"kind":"text","text":"sent-documents"}},
    {"receiver":"internal","message":{"kind":"text","text":"viewed-documents"}},
    {"receiver":"internal","message":{"kind":"text","text":"approve"}},
    {"receiver":"internal","message":{"kind":"text","text":"cancel"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetCost | 'claim-rights-transfer' | 'sent-documents' | 'viewed-documents' | 'approve' | 'cancel' | GetFunds) {
        
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
        if (message === 'approve') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'cancel') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetFunds') {
            body = beginCell().store(storeGetFunds(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
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
    
}