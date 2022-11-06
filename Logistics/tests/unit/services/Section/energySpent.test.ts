import { EnergySpent} from '../../../../src/domain/sections/energySpent';


import{ expect} from 'chai'


describe ("Create energySpent",()=>{


    it("energySpent should be 1",async()=>{
        const energySpent=EnergySpent.create(1);
        expect(energySpent.getValue().value).to.equal(1);
    });

});




describe ("Create an invalid energySpent",()=>{


    it("energySpent should be negative",async()=>{
        const energySpent=EnergySpent.create(-1);
        expect(energySpent.error).to.equal("energySpent needs to be greater than to 0");
    });

    
    describe ("Create an invalid energySpent",()=>{
        it("Distance should be null",async()=>{
            const energySpent=EnergySpent.create(NaN);
            expect(energySpent.error).to.equal(null);
        });
    });
});
