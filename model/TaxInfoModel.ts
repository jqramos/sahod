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
    payLevel: number;
    salaryOnPayType: number;
    sector: string;
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
        this.payLevel = 1;
        this.salaryOnPayType = 1;
        this.sector = 'private';
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
    gsis: number;
    deductibleAmount: number;
    [key: string]: any

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
        this.gsis = 0;
        this.deductibleAmount = 0;
    }
}


export class TaxParameters {
    levelOne: PayCriteria;
    levelTwo: PayCriteria;
    levelThree: PayCriteria;
    levelFour: PayCriteria;
    levelFive: PayCriteria;
    levelSix: PayCriteria;
    constructor() {
        this.levelOne = new PayCriteria();
        this.levelTwo = new PayCriteria();
        this.levelThree = new PayCriteria();
        this.levelFour = new PayCriteria();
        this.levelFive = new PayCriteria();
        this.levelSix = new PayCriteria();

    }
}
export class PayCriteria {
    minWithTax: number;
    percentage: number ;
    amount: number;
    constructor() {
        this.minWithTax = 0;
        this.percentage = 0;
        this.amount = 0;
    }
}
