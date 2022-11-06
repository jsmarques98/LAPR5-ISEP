import { Section} from '../../../../src/domain/sections/section';


import{ expect} from 'chai'
import ISectionDTO  from '../../../../src/dto/ISectionDTO';


describe ("Create Section",()=>{

  

    it("Section",async()=>{
        let truckDto={ "id": "11",
        "duration":2,
        "distance": 33, 
        "energySpent": 55,
        "extraTime": 34,
        "warehouseOrigin": "11",
        "warehouseDestiny": "3"}as ISectionDTO;
        const section=Section.create(truckDto);
        expect(section.getValue().duration.value).to.equal(2);
    });
});

