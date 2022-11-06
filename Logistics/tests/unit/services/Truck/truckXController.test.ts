import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import ITruckService from "../../../../src/services/IServices/ITruckService";
import TruckController from "../../../../src/controllers/truckController";
import ITruckDTO from '../../../../src/dto/ITruckDTO';

describe('truck controller', function () {
    beforeEach(function() {
    });

    it('returns json with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when create', async function () {
        let body = { "plate":"truck2s1254511",
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

        let truckServiceClass = require("../../../../src/services/truckService").default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

        truckServiceInstance = Container.get("TruckService");
        sinon.stub(truckServiceInstance, "createTruck").returns( Result.ok<ITruckDTO>( {"plate":req.body.plate,"domainId":"123", "name": req.body.name,
        "autonomy":req.body.autonomy,
        "maxBattery":req.body.maxBattery,
        "payLoad":req.body.payLoad,
        "tare":req.body.tare,
        "baterryChargingTime":req.body.baterryChargingTime} ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "plate":req.body.plate,"domainId":"123", "name": req.body.name,
        "autonomy":req.body.autonomy,
        "maxBattery":req.body.maxBattery,
        "payLoad":req.body.payLoad,
        "tare":req.body.tare,
        "baterryChargingTime":req.body.baterryChargingTime,
      }));
    });







    

    it('returns json with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when updateTruck', async function () {
        let body = { "plate":"truck2s1254511",
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
        


        let truckServiceClass = require("../../../../src/services/truckService").default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

        truckServiceInstance = Container.get("TruckService");
        sinon.stub(truckServiceInstance, "updateTruck").returns( Result.ok<ITruckDTO>( {"plate":req.body.plate,"domainId":"123", "name": req.body.name,
        "autonomy":req.body.autonomy,
        "maxBattery":req.body.maxBattery,
        "payLoad":req.body.payLoad,
        "tare":req.body.tare,
        "baterryChargingTime":req.body.baterryChargingTime} ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "plate":req.body.plate,"domainId":"123", "name": req.body.name,
        "autonomy":req.body.autonomy,
        "maxBattery":req.body.maxBattery,
        "payLoad":req.body.payLoad,
        "tare":req.body.tare,
        "baterryChargingTime":req.body.baterryChargingTime,
      }));
    });

    it('returns json with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when get  truck', async function () {
        let body = {"plate":"truck2s1254511" 
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
        

        let truckServiceClass = require("../../../../src/services/truckService").default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

        truckServiceInstance = Container.get("TruckService");
        sinon.stub(truckServiceInstance, "getTruck").returns( Result.ok<ITruckDTO>( {"plate":"24-MT-77","domainId":"123", "name": "truck",
        "autonomy":2,
        "maxBattery":2,
        "payLoad":2,
        "tare":2,
        "baterryChargingTime":2} ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.getTruck(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({"plate":"24-MT-77","domainId":"123", "name": "truck",
        "autonomy":2,
        "maxBattery":2,
        "payLoad":2,
        "tare":2,
        "baterryChargingTime":2}));
    });

    it('returns json with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when get all trucks', async function () {
        let body = { 
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
        

        let truckServiceClass = require("../../../../src/services/truckService").default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

        truckServiceInstance = Container.get("TruckService");
        let lista :{  "domainId": string,"name": string,"maxBattery": number, "autonomy": number;
    "payLoad": number,"tare": number; "baterryChargingTime": number, "plate": string}[]=[{"plate":"57-25-kd",
    "domainId":"1",
    "name": "truck",
    "autonomy":1,
    "maxBattery":1,
    "payLoad":1,
    "tare":1,
    "baterryChargingTime":1},{"plate":"24-MT-77",
    "domainId":"1",
    "name": "truck",
    "autonomy":1,
    "maxBattery":1,
    "payLoad":1,
    "tare":1,
    "baterryChargingTime":1}];

        sinon.stub(truckServiceInstance, "getAllTrucks").returns(Result.ok<ITruckDTO[]>(lista
        ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(lista,));
    });
});

