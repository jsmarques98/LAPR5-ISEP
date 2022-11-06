import { MaxBattery} from '../../../../src/domain/trucks/maxBattery';


import{ expect} from 'chai'


describe ("Create MaxBattery",()=>{


    it("MaxBattery should be 1",async()=>{
        const maxBattery=MaxBattery.create(1);
        expect(maxBattery.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid MaxBattery",()=>{


    it("MaxBattery should be negative",async()=>{
        const maxBattery=MaxBattery.create(-1);
        expect(maxBattery.error).to.equal("maxBattery needs to be greater than to 0");
    });

});

describe ("Create an invalid MaxBattery",()=>{


    it("MaxBattery should be null",async()=>{
        const maxBattery=MaxBattery.create(NaN);
        expect(maxBattery.error).to.equal(null);
    });

});
