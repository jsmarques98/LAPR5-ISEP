import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import ISectionService from "../../../../src/services/IServices/ISectionService";
import SectionController from "../../../../src/controllers/sectionController";
import ISectionDTO from '../../../../src/dto/ISectionDTO';

describe('section controller', function () {
    beforeEach(function() {
    });

    it('returns json with id+duration+distance+energySpent+extraTime+warehouseOrigin+warehouseDestiny values when create', async function () {
        let body = {     "id": "11",
            "duration": 1,
            "distance": 123, 
            "energySpent": 1,
            "extraTime": 1,
            "warehouseOrigin": "1",
            "warehouseDestiny": "2",
       };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};
        let sectionSchemaInstance = require("../../../../src/persistence/schemas/sectionSchema").default;
        Container.set("sectionSchema", sectionSchemaInstance);

        let sectionRepoClass = require("../../../../src/repos/sectionRepo").default;
        let sectionRepoInstance = Container.get(sectionRepoClass);
        Container.set("SectionRepo", sectionRepoInstance);

        let sectionServiceClass = require("../../../../src/services/sectionService").default;
        let sectionServiceInstance = Container.get(sectionServiceClass);
        Container.set("SectionService", sectionServiceInstance);

        sectionServiceInstance = Container.get("SectionService");
        sinon.stub(sectionServiceInstance, "createSection").returns( Result.ok<ISectionDTO>( { "id": req.body.id,
        "duration":req.body.duration,
        "distance": req.body.distance, 
        "energySpent": req.body.energySpent,
        "extraTime": req.body.extraTime,
        "warehouseOrigin": req.body.warehouseOrigin,
        "warehouseDestiny": req.body.warehouseDestiny} ));

        const ctrl = new SectionController(sectionServiceInstance as ISectionService);

        await ctrl.createSection(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": req.body.id,
        "duration":req.body.duration,
        "distance": req.body.distance, 
        "energySpent": req.body.energySpent,
        "extraTime": req.body.extraTime,
        "warehouseOrigin": req.body.warehouseOrigin,
        "warehouseDestiny": req.body.warehouseDestiny}));
    });

    it('returns json with id+duration+distance+energySpent+extraTime+warehouseOrigin+warehouseDestiny values when update', async function () {
        let body = {     "id": "11",
            "duration": 1,
            "distance": 123, 
            "energySpent": 1,
            "extraTime": 1,
            "warehouseOrigin": "1",
            "warehouseDestiny": "2",
       };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};
        let sectionSchemaInstance = require("../../../../src/persistence/schemas/sectionSchema").default;
        Container.set("sectionSchema", sectionSchemaInstance);

        let sectionRepoClass = require("../../../../src/repos/sectionRepo").default;
        let sectionRepoInstance = Container.get(sectionRepoClass);
        Container.set("SectionRepo", sectionRepoInstance);

        let sectionServiceClass = require("../../../../src/services/sectionService").default;
        let sectionServiceInstance = Container.get(sectionServiceClass);
        Container.set("SectionService", sectionServiceInstance);

        sectionServiceInstance = Container.get("SectionService");
        sinon.stub(sectionServiceInstance, "updateSection").returns( Result.ok<ISectionDTO>( { "id": req.body.id,
        "duration":req.body.duration,
        "distance": req.body.distance, 
        "energySpent": req.body.energySpent,
        "extraTime": req.body.extraTime,
        "warehouseOrigin": req.body.warehouseOrigin,
        "warehouseDestiny": req.body.warehouseDestiny} ));

        const ctrl = new SectionController(sectionServiceInstance as ISectionService);

        await ctrl.updateSection(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": req.body.id,
        "duration":req.body.duration,
        "distance": req.body.distance, 
        "energySpent": req.body.energySpent,
        "extraTime": req.body.extraTime,
        "warehouseOrigin": req.body.warehouseOrigin,
        "warehouseDestiny": req.body.warehouseDestiny}));
    });

    it('returns json with id+duration+distance+energySpent+extraTime+warehouseOrigin+warehouseDestiny values when update', async function () {
        let body = {   
       };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};
        let sectionSchemaInstance = require("../../../../src/persistence/schemas/sectionSchema").default;
        Container.set("sectionSchema", sectionSchemaInstance);

        let sectionRepoClass = require("../../../../src/repos/sectionRepo").default;
        let sectionRepoInstance = Container.get(sectionRepoClass);
        Container.set("SectionRepo", sectionRepoInstance);

        let sectionServiceClass = require("../../../../src/services/sectionService").default;
        let sectionServiceInstance = Container.get(sectionServiceClass);
        Container.set("SectionService", sectionServiceInstance);

        sectionServiceInstance = Container.get("SectionService");

        let lista :{  "id": string,"duration": number,"distance": number, "energySpent": number;
        "extraTime": number,"warehouseOrigin": string; "warehouseDestiny": string}[]=[{ "id": "1",
        "duration":2,
        "distance": 33, 
        "energySpent": 55,
        "extraTime": 34,
        "warehouseOrigin": "11",
        "warehouseDestiny": "2"},{ "id": "11",
        "duration":2,
        "distance": 33, 
        "energySpent": 55,
        "extraTime": 34,
        "warehouseOrigin": "11",
        "warehouseDestiny": "3"}];


        sinon.stub(sectionServiceInstance, "getAllSections").returns( Result.ok<ISectionDTO[]>(lista ));

        const ctrl = new SectionController(sectionServiceInstance as ISectionService);

        await ctrl.getAllSections(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(lista));
    });
});

