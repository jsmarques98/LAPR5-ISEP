import { BaterryChargingTime} from '../../../../src/domain/trucks/baterryChargingTime';


import{ expect} from 'chai'


describe ("Create BaterryChargingTime",()=>{


    it("BaterryChargingTime should be 1",async()=>{
        const baterryChargingTime=BaterryChargingTime.create(1);
        expect(baterryChargingTime.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid BaterryChargingTime",()=>{


    it("BaterryChargingTime should be negative",async()=>{
        const baterryChargingTime=BaterryChargingTime.create(-1);
        expect(baterryChargingTime.error).to.equal("baterryChargingTime needs to be greater than to 0");
    });

});

describe ("Create an invalid BaterryChargingTime",()=>{


    it("BaterryChargingTime should be null",async()=>{
        const baterryChargingTime=BaterryChargingTime.create(NaN);
        expect(baterryChargingTime.error).to.equal(null);
    });

});
