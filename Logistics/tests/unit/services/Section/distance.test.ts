import { Distance} from '../../../../src/domain/sections/distance';


import{ expect} from 'chai'


describe ("Create Distance",()=>{


    it("distance should be 1",async()=>{
        const distance=Distance.create(1);
        expect(distance.getValue().value).to.equal(1);
    });

});




describe ("Create an invalid Distance",()=>{


    it("Distance should be negative",async()=>{
        const distance=Distance.create(-1);
        expect(distance.error).to.equal("distance needs to be greater than to 0");
    });

    
    describe ("Create an invalid Distance",()=>{
        it("Distance should be null",async()=>{
            const distance=Distance.create(NaN);
            expect(distance.error).to.equal(null);
        });
    });
});
