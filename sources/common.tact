struct PersonDetails {
    name: String;
    address: String;
}

struct DocumentData {
    author: PersonDetails;
    title: String;
    rootHash: String;
    data: String;
    tags: String?;
    description: String?;
}

message GetFunds {
    amount: Int as coins;
}

message SetCommissions {
    commissions: Commissions;

    // if there is no address, the commision will be updated for the autproof contract
    documentAddress: Address?;
}

struct Commissions {
    // Transfership commission for the exclusive rights transfership
    transfershipCommissionPercentage: Int as uint256; // in per cent mille (1/1000)

    // Roalty commission for the exclusive rights transfership.
    royaltyCommissionPercentage: Int as uint256; // in per cent mille (1/1000)
}

fun validateCommissions(commissions: Commissions) {
    require(commissions.transfershipCommissionPercentage >= 0, "Transfership commission percentage can't be less than 0");
    require(commissions.transfershipCommissionPercentage <= 1000, "Transfership commission percentage can't be greater than 1000");
    require(commissions.royaltyCommissionPercentage >= 0, "Royalty commission percentage can't be less than 0");
    require(commissions.royaltyCommissionPercentage <= 1000, "Royalty commission percentage can't be greater than 1000");
}