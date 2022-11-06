import { Tare} from '../../../../src/domain/trucks/tare';


import{ expect} from 'chai'


describe ("Create tare",()=>{


    it("tare should be 1",async()=>{
        const tare=Tare.create(1);
        expect(tare.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid tare",()=>{


    it("tare should be null",async()=>{
        const tare=Tare.create(-1);
        expect(tare.error).to.equal("tare needs to be greater than to 0");
    });

});
