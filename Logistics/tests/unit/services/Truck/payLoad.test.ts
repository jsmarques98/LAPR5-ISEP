import { PayLoad} from '../../../../src/domain/trucks/payLoad';


import{ expect} from 'chai'


describe ("Create payLoad",()=>{


    it("payLoad should be 1",async()=>{
        const payLoad=PayLoad.create(1);
        expect(payLoad.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid payLoad",()=>{


    it("payLoad should be negative",async()=>{
        const payLoad=PayLoad.create(-1);
        expect(payLoad.error).to.equal("payLoad needs to be greater than to 0");
    });

});

describe ("Create an invalid payLoad",()=>{


    it("payLoad should be null",async()=>{
        const payLoad=PayLoad.create(NaN);
        expect(payLoad.error).to.equal(null);
    });

});
