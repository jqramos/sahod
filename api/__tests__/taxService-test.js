import * as React from 'react';
import {computeSSSContrib, computeTax} from "../taxService";

test(`compute SSS contribution`, () => {
    let result = computeSSSContrib(6300);
    console.log(result)
});
