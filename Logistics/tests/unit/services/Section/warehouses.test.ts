import { WareHouses} from '../../../../src/domain/sections/warehouses';


import{ expect} from 'chai'


describe ("Create WareHouses",()=>{


    it("warehouseDestiny should be 3",async()=>{
        const warehouses=WareHouses.create("1","3");
        expect(warehouses.getValue().warehouseDestiny).to.equal("3");
    });

});






    
describe ("Create an invalid warehouses",()=>{
    it("warehouses should be null",async()=>{
        const warehouses=WareHouses.create("","");
        expect(warehouses.error).to.equal(null);
    });
});

