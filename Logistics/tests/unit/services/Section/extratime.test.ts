import { ExtraTime} from '../../../../src/domain/sections/extraTime';


import{ expect} from 'chai'


describe ("Create ExtraTime",()=>{


    it("ExtraTime should be 1",async()=>{
        const extraTime=ExtraTime.create(1);
        expect(extraTime.getValue().value).to.equal(1);
    });

});




describe ("Create an invalid ExtraTime",()=>{


    it("ExtraTime should be negative",async()=>{
        const extraTime=ExtraTime.create(-1);
        expect(extraTime.error).to.equal("extraTime needs to be greater than to 0");
    });

    
    describe ("Create an invalid ExtraTime",()=>{
        it("Distance should be null",async()=>{
            const extraTime=ExtraTime.create(NaN);
            expect(extraTime.error).to.equal(null);
        });
    });
});
