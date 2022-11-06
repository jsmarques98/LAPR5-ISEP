import { Truck} from '../../../../src/domain/trucks/truck';


import{ expect} from 'chai'
import ITruckDTO from '../../../../src/dto/ITruckDTO';


describe ("Create Truck",()=>{

  

    it("Truck",async()=>{
        let truckDto={"plate":"24-MT-77","domainId":"123", "name": "TRUCK",
        "autonomy":1,
        "maxBattery":1,
        "payLoad":1,
        "tare":1,
        "baterryChargingTime":1} as ITruckDTO;
        const truck=Truck.create(truckDto);
        expect(truck.getValue().plate.value).to.equal("24-MT-77");
    });

});

describe ("Create an invalid Truck",()=>{

    it("name should be null",async()=>{
        let truckDto={"plate":"24-MT-77","domainId":"123", "name": "",
        "autonomy":1,
        "maxBattery":1,
        "payLoad":1,
        "tare":1,
        "baterryChargingTime":1} as ITruckDTO;
        const truck=Truck.create(truckDto);
        expect(truck.error).to.equal("Must provide a truck name");
    });
});
