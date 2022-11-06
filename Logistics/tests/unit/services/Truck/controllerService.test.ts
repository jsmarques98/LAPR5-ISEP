import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import TruckController from "../../../../src/controllers/truckController";
import TruckService from "../../../../src/services/truckService";

import ITruckDTO from '../../../../src/dto/ITruckDTO';
import ITruckRepo from '../../../../src/services/IRepos/ITruckRepo';
import { Truck } from "../../../../src/domain/trucks/truck";
import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Plate } from '../../../../src/domain/trucks/plate';
import ITruckServiice from '../../../../src/services/IServices/ITruckService';

describe('truck controller  Service', function () {
    beforeEach(function() {
    });

    it('create truck', async function () {
      
        let body = {"domainId":"1", "plate":"truck2s1254511",
        "name":"truck12s1251",
        "autonomy":"1",
        "maxBattery":"1",
        "payLoad":"1",
        "tare":"1",
        "baterryChargingTime":"1",
       };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};
 
 
         let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
         Container.set("truckSchema", truckSchemaInstance);
 
         let truckRepoClass = require("../../../../src/repos/truckRepo").default;
         let truckRepoInstance = Container.get(truckRepoClass);
         Container.set("TruckRepo", truckRepoInstance);
         truckRepoInstance = Container.get("TruckRepo");
         sinon.stub(truckRepoInstance, "save").returns( Result.ok<Truck>());
 
         const Service = new TruckService(truckRepoInstance as ITruckRepo );
 
         const truckController = new TruckController(Service as ITruckServiice );
        await truckController.createTruck(<Request>req, <Response>res, <NextFunction>next);
 
 
        sinon.assert.calledOnce(res.json);

        sinon.assert.calledWith(res.json, sinon.match({ "autonomy":req.body.autonomy,
        "maxBattery":req.body.maxBattery,
        "name": req.body.name,
        "payLoad":req.body.payLoad,
        "plate":req.body.plate,
 "tare":req.body.tare, 
}));
 });

it('returns dto with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when update', async function () {
   
    let body = {"domainId":"1", "plate":"truck2s1254511",
    "name":"truck12s1251",
    "autonomy":"1",
    "maxBattery":"1",
    "payLoad":"1",
    "tare":"1",
    "baterryChargingTime":"1",
   };
   let truckDTO ={"domainId":"1",
   "name": 'truck',
   "maxBattery": 1,
   "autonomy": 1,
   "payLoad": 1,
   "tare": 1,
   "baterryChargingTime": 1,
   "plate": '24-MT-77' };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};


     let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
     Container.set("truckSchema", truckSchemaInstance);

     let truckRepoClass = require("../../../../src/repos/truckRepo").default;
     let truckRepoInstance = Container.get(truckRepoClass);
     Container.set("TruckRepo", truckRepoInstance);
     truckRepoInstance = Container.get("TruckRepo");
     sinon.stub(truckRepoInstance, "findByPlate").returns( Truck.create(truckDTO,new UniqueEntityID( truckDTO.domainId)).getValue());

 

     const Service = new TruckService(truckRepoInstance as ITruckRepo );

     const truckController = new TruckController(Service as ITruckServiice );

     await truckController.updateTruck(<Request>req, <Response>res, <NextFunction>next);

     sinon.assert.calledOnce(res.json);
 

});


// // // it('get all trucks', async function () {
      
// // //     let truckDTO ={"id":"1",
// // //     "name": 'truck',
// // //     "maxBattery": '1',
// // //     "autonomy": '1',
// // //     "payLoad": '1',
// // //     "tare": '1',
// // //     "baterryChargingTime": '1',
// // //     "plate": '24-MT-77' }as ITruckDTO;
// // //     let truckDTO1 ={"id":"2",
// // //     "name": 'truck1',
// // //     "maxBattery": '1',
// // //     "autonomy": '1',
// // //     "payLoad": '1',
// // //     "tare": '1',
// // //     "baterryChargingTime": '1',
// // //     "plate": '24-MT-77' }as ITruckDTO;


// // //     let lista:{"truck":Truck}[]=[{"truck": Truck.create(truckDTO,new UniqueEntityID( truckDTO.id)).getValue()},
// // //     {"truck":Truck.create(truckDTO1,new UniqueEntityID( truckDTO1.id)).getValue()}];
// // //     console.log(lista)
// // //     let rest:{"truckdto":ITruckDTO}[]=[{"truckdto": truckDTO},{"truckdto":truckDTO1}];
// // //     let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
// // //     Container.set("truckSchema", truckSchemaInstance);

// // //     let truckRepoClass = require("../src/repos/truckRepo").default;
// // //     let truckRepoInstance = Container.get(truckRepoClass);
// // //     Container.set("TruckRepo", truckRepoInstance);
// // //     truckRepoInstance = Container.get("TruckRepo");
// // //     sinon.stub(truckRepoInstance, "findAll").returns(lista);
    
// // //     const Service = new TruckService(truckRepoInstance as ITruckRepo );
// // //     let res = await Service.getAllTrucks();
// // //     sinon.assert.match((res.getValue()),( rest ));
// // // });

it('get truck by plate', async function () {
    let body = {"domainId":"1", "plate":"truck2s1254511",
    "name":"truck12s1251",
    "autonomy":"1",
    "maxBattery":"1",
    "payLoad":"1",
    "tare":"1",
    "baterryChargingTime":"1",
   };
    let plate="24-MT-77";
    let truckDTO ={"domainId":"1",
    "name": 'truck',
    "maxBattery": 1,
    "autonomy": 1,
    "payLoad": 1,
    "tare": 1,
    "baterryChargingTime": 1,
    "plate": '24-MT-77' } as ITruckDTO;

    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};
    
    let truck=Truck.create(truckDTO,new UniqueEntityID( truckDTO.domainId)).getValue() as Truck;

     let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
     Container.set("truckSchema", truckSchemaInstance);

     let truckRepoClass = require("../../../../src/repos/truckRepo").default;
     let truckRepoInstance = Container.get(truckRepoClass);
     Container.set("TruckRepo", truckRepoInstance);
     truckRepoInstance = Container.get("TruckRepo");
    // sinon.stub(truckRepoInstance, "findByPlate").returns(truck);

 

     const Service = new TruckService(truckRepoInstance as ITruckRepo );
     const truckController = new TruckController(Service as ITruckServiice );

     await truckController.getTruck(<Request>req, <Response>res, <NextFunction>next);

     sinon.assert.calledOnce(res.json);

});

});