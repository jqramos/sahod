export class TaxInfoModel{
    basicSalary: number;
    taxableAllowance: number;
    nonTaxableAllowance: number;
    mealAllowance: number;
    clothingAllowance: number;
    holidayPay: number;
    riceSubsidy: number;
    otherAllowance: number;
    payType: string;
    constructor() {
        this.basicSalary = 0;
        this.taxableAllowance = 0;
        this.nonTaxableAllowance = 0;
        this.mealAllowance = 0;
        this.clothingAllowance = 0;
        this.holidayPay = 0;
        this.riceSubsidy = 0;
        this.otherAllowance = 0;
        this.payType = 'monthly';
    }
}

export class PayoutSummary {
    taxableAmount: number;
    basicTax: number;
    additionalTax: number;
    taxInfo: TaxInfoModel;
    grossSalary: number;
    netSalary: number;
    philhealth: number;
    hdmf: number;
    sss: number;
    deductibleAmount: number;

    constructor() {
        this.taxableAmount = 0;
        this.basicTax = 0;
        this.additionalTax = 0;
        this.taxInfo = new TaxInfoModel();
        this.grossSalary = 0;
        this.netSalary = 0;
        this.philhealth = 0;
        this.hdmf = 0;
        this.sss = 0;
        this.deductibleAmount = 0;
    }
}
