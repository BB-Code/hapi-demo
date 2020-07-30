const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { expect } = Code;
const { it, describe } = exports.lab = Lab.script();

const sum = (x,y)=>{
    return x + y;
}

describe('add sum',()=>{
    it('1 add 3',()=>{
        expect(sum(1,3)).to.equal(4);
    });
});