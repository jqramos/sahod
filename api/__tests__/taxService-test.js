import * as React from 'react';
import {computeSSSContrib, computeTax} from "../taxService";
import {TaxInfoModel} from "../../model/TaxInfoModel";

test(`compute SSS contribution`, () => {
    let result = computeSSSContrib(6300);
    console.log(result)
});

test(`compute tax`, () => {
    const payData = new TaxInfoModel();
    payData.basicSalary = 50000;
    payData.nonTaxableAllowance = 0;
    payData.payType = 'semiMonthly'
    payData.sector = 'private'
    let result = computeTax(payData);
    console.log(result)


});


test(`testo`, () => {
    let a = 50;
    let b = 100;
    if (true) {
        let a = 60;
        var c = 10;
        console.log(a/c); // 6
        console.log(b/c); // 10
    }
    console.log(c); // 10
    console.log(a); // 50
    class People {
        constructor(name) {
            this.name = name;
        }
        get Name() {
            return this.name;
        }
        set Name(name) {
            this.name = name;
        }
    }
    let person = new People("Jon Snow");
    console.log(person.Name);
    person.Name = "Dany";
    console.log(person.Name);

});
