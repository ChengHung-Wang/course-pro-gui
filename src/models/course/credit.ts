export interface Credit {
    failedCredit: number,
    lowerAverageCredit: number,
    safeCredit: number,
    secondDropCredit: number,
    lostScoreTotal: number,
    GPAAverage: number, // totalGPAScore / totalCountableCredit
    totalGPAScore: number, // sum of (rating * credit)
    totalCountableCredit: number, // sum of credit
}
