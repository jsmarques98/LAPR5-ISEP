import { Autonomy} from '../../../../src/domain/trucks/autonomy';


import{ expect} from 'chai'


describe ("Create Autonumy",()=>{


    it("autonomy should be 1",async()=>{
        const autonomy=Autonomy.create(1);
        expect(autonomy.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid Autonumy",()=>{


    it("autonomy should be negative",async()=>{
        const autonomy=Autonomy.create(-1);
        expect(autonomy.error).to.equal("autonomy needs to be greater than or equal to 0");
    });

});

describe ("Create an invalid Autonumy",()=>{
    it("autonomy should be null",async()=>{
        const autonomy=Autonomy.create(NaN);
        expect(autonomy.error).to.equal(null);
    });
});
