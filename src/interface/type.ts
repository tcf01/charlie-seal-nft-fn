export interface ReturnValues {
    0: string;
    1: string;
    2: string;
    from: string;
    to: string;
    tokenId: string;
}

export interface Raw {
    data: string;
    topics: string[];
}

export interface Transfer {
    address: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    logIndex: number;
    removed: boolean;
    id: string;
    returnValues: ReturnValues;
    event: string;
    signature: string;
    raw: Raw;
}

export interface Events {
    Transfer: Transfer;
}

export interface BuyNFTRes {
    blockHash: string;
    blockNumber: number;
    contractAddress?: any;
    cumulativeGasUsed: number;
    effectiveGasPrice: string;
    from: string;
    gasUsed: number;
    logsBloom: string;
    status: boolean;
    to: string;
    transactionHash: string;
    transactionIndex: number;
    type: string;
    events: Events;
}





