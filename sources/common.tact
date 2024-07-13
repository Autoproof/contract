struct DocumentData {
    authorship: String;
    description: String;
    rootHash: String;
    data: String;
    tags: String;
}

message GetFunds {
    amount: Int as coins;
}

message SetCommissionPercentage {
    commissionPercentage: Int as uint256;

    // if there is no address, the commision will be updated for the autproof contract
   documentAddress: Address?;
}
