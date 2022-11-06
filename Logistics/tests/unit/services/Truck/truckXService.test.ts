import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import TruckService from "../../../../src/services/truckService";
import ITruckDTO from '../../../../src/dto/ITruckDTO';
import ITruckRepo from '../../../../src/services/IRepos/ITruckRepo';
import { Truck } from "../../../../src/domain/trucks/truck";
import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Plate } from '../../../../src/domain/trucks/plate';

describe('truck Service', function () {
    beforeEach(function() {
    });

    it('returns dto with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when create', async function () {
      
        let truckDTO ={"domainId":"1",
        "name": 'truck',
        "maxBattery": 1,
        "autonomy": 1,
        "payLoad": 1,
        "tare": 1,
        "baterryChargingTime": 1,
        "plate": '24-MT-77' };
 
 
         let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
         Container.set("truckSchema", truckSchemaInstance);
 
         let truckRepoClass = require("../../../../src/repos/truckRepo").default;
         let truckRepoInstance = Container.get(truckRepoClass);
         Container.set("TruckRepo", truckRepoInstance);
         truckRepoInstance = Container.get("TruckRepo");
         sinon.stub(truckRepoInstance, "save").returns( Result.ok<Truck>());
 
     
 
         const Service = new TruckService(truckRepoInstance as ITruckRepo );
 
         let res = await Service.createTruck(truckDTO as ITruckDTO );
 
 sinon.assert.match((res.getValue() as ITruckDTO),( truckDTO as ITruckDTO ));
 });

it('returns dto with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when update', async function () {
      
    let truckDTO ={"domainId":"1",
    "name": 'truck',
    "maxBattery": 1,
    "autonomy": 1,
    "payLoad": 1,
    "tare": 1,
    "baterryChargingTime": 1,
    "plate": '24-MT-77' };


     let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
     Container.set("truckSchema", truckSchemaInstance);

     let truckRepoClass = require("../../../../src/repos/truckRepo").default;
     let truckRepoInstance = Container.get(truckRepoClass);
     Container.set("TruckRepo", truckRepoInstance);
     truckRepoInstance = Container.get("TruckRepo");
     sinon.stub(truckRepoInstance, "findByPlate").returns( Truck.create(truckDTO,new UniqueEntityID( truckDTO.domainId)).getValue());

 

     const Service = new TruckService(truckRepoInstance as ITruckRepo );

     let res = await Service.updateTruck(truckDTO as ITruckDTO );

sinon.assert.match((res.getValue() as ITruckDTO),( truckDTO as ITruckDTO ));
});

// it('get all trucks', async function () {
      
//     let truckDTO ={"id":"1",
//     "name": 'truck',
//     "maxBattery": '1',
//     "autonomy": '1',
//     "payLoad": '1',
//     "tare": '1',
//     "baterryChargingTime": '1',
//     "plate": '24-MT-77' }as ITruckDTO;
//     let truckDTO1 ={"id":"2",
//     "name": 'truck1',
//     "maxBattery": '1',
//     "autonomy": '1',
//     "payLoad": '1',
//     "tare": '1',
//     "baterryChargingTime": '1',
//     "plate": '24-MT-77' }as ITruckDTO;


//     let lista:{"truck":Truck}[]=[{"truck": Truck.create(truckDTO,new UniqueEntityID( truckDTO.id)).getValue()},
//     {"truck":Truck.create(truckDTO1,new UniqueEntityID( truckDTO1.id)).getValue()}];
//     console.log(lista)
//     let rest:{"truckdto":ITruckDTO}[]=[{"truckdto": truckDTO},{"truckdto":truckDTO1}];
//     let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
//     Container.set("truckSchema", truckSchemaInstance);

//     let truckRepoClass = require("../src/repos/truckRepo").default;
//     let truckRepoInstance = Container.get(truckRepoClass);
//     Container.set("TruckRepo", truckRepoInstance);
//     truckRepoInstance = Container.get("TruckRepo");
//     sinon.stub(truckRepoInstance, "findAll").returns(lista);
    
//     const Service = new TruckService(truckRepoInstance as ITruckRepo );
//     let res = await Service.getAllTrucks();
//     sinon.assert.match((res.getValue()),( rest ));
// });

it('get truck by plate', async function () {
      
    let plate="24-MT-77";
    let truckDTO ={"domainId":"1",
    "name": 'truck',
    "maxBattery": 1,
    "autonomy": 1,
    "payLoad": 1,
    "tare": 1,
    "baterryChargingTime": 1,
    "plate": '24-MT-77' } as ITruckDTO;
    
    let truck=Truck.create(truckDTO,new UniqueEntityID( truckDTO.domainId)).getValue() as Truck;

     let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
     Container.set("truckSchema", truckSchemaInstance);

     let truckRepoClass = require("../../../../src/repos/truckRepo").default;
     let truckRepoInstance = Container.get(truckRepoClass);
     Container.set("TruckRepo", truckRepoInstance);
     truckRepoInstance = Container.get("TruckRepo");
    // sinon.stub(truckRepoInstance, "findByPlate").returns(truck);

 

     const Service = new TruckService(truckRepoInstance as ITruckRepo );

     let res = await Service.getTruck(plate);

sinon.assert.match((res.getValue() as ITruckDTO),( truckDTO as ITruckDTO ));
});

});