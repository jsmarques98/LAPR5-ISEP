import { Duration} from '../../../../src/domain/sections/duration';


import{ expect} from 'chai'


describe ("Create duration",()=>{


    it("duration should be 1",async()=>{
        const duration=Duration.create(1);
        expect(duration.getValue().value).to.equal(1);
    });

});




describe ("Create an invalid duration",()=>{


    it("duration should be negative",async()=>{
        const duration=Duration.create(-1);
        expect(duration.error).to.equal("duration needs to be greater than to 0");
    });

    
    describe ("Create an invalid Distance",()=>{
        it("Distance should be null",async()=>{
            const duration=Duration.create(NaN);
            expect(duration.error).to.equal(null);
        });
    });
});
