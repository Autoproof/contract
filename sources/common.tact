struct DocumentData {
    authorship: String;
    description: String;
    rootHash: String;
    data: String;
    tags: String;
}

struct Commissions {
    // Transfership commission for the exclusive rights transfership
    transfershipCommissionPercentage: Int as uint256; // in per cent mille (1/1000)

    // Roalty commission for the exclusive rights transfership.
    royaltyCommissionPercentage: Int as uint256; // in per cent mille (1/1000)
}

message GetFunds {
    amount: Int as coins;
}

message SetCommissions {
    commissions: Commissions;

    // if there is no address, the commision will be updated for the autproof contract
    documentAddress: Address?;
}
