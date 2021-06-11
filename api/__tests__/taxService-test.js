import * as React from 'react';
import {computeSSSContrib, computeTax} from "../taxService";
import {TaxInfoModel} from "../../model/TaxInfoModel";

test(`compute SSS contribution`, () => {
    let result = computeSSSContrib(6300);
    console.log(result)
});

test(`compute tax`, () => {
    const payData = new TaxInfoModel();
    payData.basicSalary = 200;
    payData.nonTaxableAllowance = 0;
    payData.payType = 'weekly'
    payData.sector = 'private'
    let result = computeTax(payData);
    console.log(result)
});
