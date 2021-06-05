import {PayoutSummary, TaxInfoModel} from "../model/TaxInfoModel";
import TaxConstants from "../constants/TaxConstants";
import {parseInitialURLAsync} from "expo-linking";

export const computeTax = (payData: TaxInfoModel) => {
    const payoutSummary = new PayoutSummary();
    payoutSummary.grossSalary =  payData.basicSalary + payData.nonTaxableAllowance +
        payData.taxableAllowance + payData.clothingAllowance + payData.mealAllowance
        + payData.holidayPay + payData.riceSubsidy + payData.otherAllowance
    switch (payData.payType) {
        case 'daily':
            break;
        case 'weekly':
            break;
        case 'semiMonthly':
            break;
        case 'monthly':
            break;

    }
    return payoutSummary;
}

export const computeSSSContrib = (basicSalary: number) => {
    if (basicSalary >= 24750) {
        return 1125;
    } else if (basicSalary < 3250) {
        return 135;
    }
    let contribution = 0;
    const salaryString = String(basicSalary);
    const firstDigit = salaryString.length === 4 ? parseInt(salaryString.charAt(0)) : parseInt(salaryString.substr(0, 2));
    const remaining = salaryString.length === 4 ? parseInt(salaryString.substr(1)) : parseInt(salaryString.substr(2));
    if (basicSalary < 20750) {
        const fund =  remaining >= 250 && remaining <= 749.99 ? parseInt(firstDigit + "500"): parseInt(firstDigit + "000")
        return fund * 0.045
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

