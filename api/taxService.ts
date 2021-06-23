import {PayoutSummary, TaxInfoModel, TaxParameters} from "../model/TaxInfoModel";
import TaxConstants from "../constants/TaxConstants";
import GenericConstants from "../constants/GenericConstants";

export const computeTax = (payData: TaxInfoModel) => {
    let payoutSummary = new PayoutSummary();
    payoutSummary.grossSalary =  payData.basicSalary + payData.nonTaxableAllowance +
        payData.taxableAllowance + payData.clothingAllowance + payData.mealAllowance
        + payData.holidayPay + payData.riceSubsidy + payData.otherAllowance
    payoutSummary.sss = computeSSSContrib(payData.basicSalary);
    payoutSummary.philhealth = computePhilHealth(payData.basicSalary);
    payoutSummary.hdmf = computePagibig(payData.basicSalary);
    payoutSummary.gsis = payData.sector == 'public' ? payData.basicSalary * GenericConstants.percentage.gsis : 0;
    payoutSummary.taxInfo = payData;
    switch (payData.payType) {
        case 'daily':
            payData.salaryOnPayType = (payData.basicSalary * 12) / 261;
            payoutSummary.philhealth =  payoutSummary.philhealth/21
            payoutSummary.hdmf =  payoutSummary.hdmf/21
            payoutSummary.sss =  payoutSummary.sss/21
            payoutSummary.sss =  payoutSummary.gsis/21
            payoutSummary = computeTaxPerPayLevel(payData, TaxConstants.daily, payoutSummary);
            payoutSummary.netSalary = payoutSummary.netSalary * 21;
            break;
        case 'weekly':
            payoutSummary.philhealth =  payoutSummary.philhealth/4
            payoutSummary.hdmf =  payoutSummary.hdmf/4
            payoutSummary.sss =  payoutSummary.sss/4
            payoutSummary.sss =  payoutSummary.gsis/4
            payData.salaryOnPayType = (payData.basicSalary * 12) / 52;
            payoutSummary = computeTaxPerPayLevel(payData, TaxConstants.weekly, payoutSummary);
            payoutSummary.netSalary = payoutSummary.netSalary * 4;
            break;
        case 'semiMonthly':
            payoutSummary.philhealth =  payoutSummary.philhealth/2
            payoutSummary.hdmf =  payoutSummary.hdmf/2
            payoutSummary.sss =  payoutSummary.sss/2
            payoutSummary.sss =  payoutSummary.gsis/2
            payData.salaryOnPayType = payData.basicSalary/ 2;
            payoutSummary = computeTaxPerPayLevel(payData, TaxConstants.semiMonthly, payoutSummary);
            payoutSummary.netSalary = payoutSummary.netSalary * 2;
            break;
        case 'monthly':
            payData.salaryOnPayType = payData.basicSalary;
            payoutSummary = computeTaxPerPayLevel(payData, TaxConstants.monthly, payoutSummary);
            break;

    }
    return payoutSummary;
}

export const computeSSSContrib = (basicSalary: number) => {
    if (basicSalary >= 24750) {
        return 1125;
    } else if (basicSalary <= 3250) {
        return basicSalary * GenericConstants.percentage.sss;
    }
    let contribution = 0;
    const salaryString = String(basicSalary);
    const firstDigit = salaryString.length === 4 ? parseInt(salaryString.charAt(0)) : parseInt(salaryString.substr(0, 2));
    const remaining = salaryString.length === 4 ? parseInt(salaryString.substr(1)) : parseInt(salaryString.substr(2));
    if (basicSalary < 20750) {
        const fund =  remaining >= 250 && remaining <= 749.99 ? parseInt(firstDigit + "500"): parseInt(firstDigit + "000")
        return fund * GenericConstants.percentage.sss;
    } else
    if (basicSalary <= 21249.99	) { return 945; } else
    if (basicSalary <= 22249.99) { return 990; } else
    if (basicSalary <= 22749.99) { return 1012.5; } else
    if (basicSalary <= 23249.99) { return 1035; } else
    if (basicSalary <= 23749.99) { return 1057.5; } else
    if (basicSalary <= 24249.99) { return 1080; } else
    if (basicSalary <= 24749.99) { return 1102.5; }
    return contribution;
}

export const computePhilHealth = (basicSalary: number) => {
    if(basicSalary <= 10000) { return 150 } else
    if(basicSalary <= 59999.99) {
        const tmpFee = basicSalary * GenericConstants.percentage.philhealth
        return tmpFee/2;
    } else {
        return 900;
    }
}

export const computePagibig = (basicSalary: number) => {
    if(basicSalary <= 1499.99) {
        return basicSalary* GenericConstants.percentage.hdmfMin
    } else {
        const tmp = basicSalary*GenericConstants.percentage.hdmfMax;
        return tmp >= 100 ? 100 : tmp;
    }
}

export const computeTaxPerPayLevel = (payData: TaxInfoModel, taxParam: TaxParameters, payoutSummary: PayoutSummary) => {
    payoutSummary.taxableAmount = payData.salaryOnPayType - (payoutSummary.sss + payoutSummary.philhealth + payoutSummary.hdmf + payoutSummary.gsis);
    if (payData. salaryOnPayType <= taxParam.levelOne.amount) {
        payoutSummary.basicTax = 0;
        payoutSummary.additionalTax = taxParam.levelOne.minWithTax;
    } else if (payData.salaryOnPayType < taxParam.levelThree.amount) {
        payoutSummary.basicTax = payoutSummary.taxableAmount <= taxParam.levelTwo.amount ?
            taxParam.levelTwo.minWithTax : (payoutSummary.taxableAmount - taxParam.levelTwo.amount) * taxParam.levelTwo.percentage;
        payoutSummary.additionalTax = taxParam.levelTwo.minWithTax;
    } else if (payData.salaryOnPayType <= taxParam.levelFour.amount) {
        payoutSummary.basicTax = payoutSummary.taxableAmount <= taxParam.levelThree.amount ?
            taxParam.levelThree.minWithTax : (payoutSummary.taxableAmount - taxParam.levelThree.amount) * taxParam.levelThree.percentage;
        payoutSummary.additionalTax = taxParam.levelThree.minWithTax;
    } else if (payData.salaryOnPayType <= taxParam.levelFive.amount) {
        payoutSummary.basicTax = payoutSummary.taxableAmount <= taxParam.levelFour.amount ?
            taxParam.levelFour.minWithTax : (payoutSummary.taxableAmount - taxParam.levelFour.amount) * taxParam.levelFour.percentage;
        payoutSummary.additionalTax = taxParam.levelFour.minWithTax;
    } else if (payData.salaryOnPayType <= taxParam.levelSix.amount) {
        payoutSummary.basicTax = payoutSummary.taxableAmount <= taxParam.levelFive.amount ?
            taxParam.levelFive.minWithTax : (payoutSummary.taxableAmount - taxParam.levelFive.amount) * taxParam.levelFive.percentage;
        payoutSummary.additionalTax = taxParam.levelFive.minWithTax;
    } else if (payData.salaryOnPayType >= taxParam.levelSix.amount) {
        payoutSummary.basicTax = payoutSummary.taxableAmount <= taxParam.levelSix.amount ?
            taxParam.levelSix.minWithTax : (payoutSummary.taxableAmount - taxParam.levelSix.amount) * taxParam.levelSix.percentage;
        payoutSummary.additionalTax = taxParam.levelSix.minWithTax;
    }
    payoutSummary.netSalary = payoutSummary.taxableAmount - (payoutSummary.basicTax + payoutSummary.additionalTax)
    payoutSummary.netSalary =  payoutSummary.netSalary + payData.nonTaxableAllowance + payData.clothingAllowance + payData.mealAllowance
    + payData.holidayPay + payData.riceSubsidy + payData.otherAllowance;
    return payoutSummary;
}
