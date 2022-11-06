import { Plate} from '../../../../src/domain/trucks/plate';


import{ expect} from 'chai'


describe ("Create plate",()=>{


    it("plate should be 1",async()=>{
        const plate=Plate.create("24-mt-77");
        expect(plate.getValue().value).to.equal("24-mt-77");
    });

});

describe ("Create an invalid plate",()=>{


    it("plate should be null",async()=>{
        const payLoad=Plate.create("");
        expect(payLoad.error).to.equal(null);
    });

});
