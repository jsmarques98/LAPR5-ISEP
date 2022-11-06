import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import SectionService from "../../../../src/services/sectionService";
import ISectionRepo from '../../../../src/services/IRepos/ISectionRepo';
import { Section } from "../../../../src/domain/sections/section";
import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import ISectionDTO from '../../../../src/dto/ISectionDTO';

describe('  Section Service', function () {
    beforeEach(function() {
    });

    it('returns json with id+duration+distance+energySpent+extraTime+warehouseOrigin+warehouseDestiny values when create', async function () {
      
        let sectionDTO ={ "id": "11",
        "duration": 1,
        "distance": 123, 
        "energySpent": 1,
        "extraTime": 1,
        "warehouseOrigin": "1",
        "warehouseDestiny": "2", };
 
 
         let sectionSchemaInstance = require("../../../../src/persistence/schemas/sectionSchema").default;
         Container.set("sectionSchema", sectionSchemaInstance);
 
         let sectionRepoClass = require("../../../../src/repos/sectionRepo").default;
         let sectionRepoInstance = Container.get(sectionRepoClass);
         Container.set("SectionRepo", sectionRepoInstance);
         sectionRepoInstance = Container.get("SectionRepo");
         sinon.stub(sectionRepoInstance, "save").returns( Result.ok<Section>());
 
     
 
         const Service = new SectionService(sectionRepoInstance as ISectionRepo );
 
         let res = await Service.createSection(sectionDTO as ISectionDTO );
 
 sinon.assert.match((res.getValue() as ISectionDTO),( sectionDTO as ISectionDTO ));
 });

it('returns dto with id+name+autonomy+maxBattery+payLoad+tare+baterryChargingTime+plate values when update', async function () {
      
    let sectionDTO ={ "id": "11",
        "duration": 1,
        "distance": 123, 
        "energySpent": 1,
        "extraTime": 1,
        "warehouseOrigin": "1",
        "warehouseDestiny": "2", };
 

        let sectionSchemaInstance = require("../../../../src/persistence/schemas/sectionSchema").default;
         Container.set("sectionSchema", sectionSchemaInstance);
 
         let sectionRepoClass = require("../../../../src/repos/sectionRepo").default;
         let sectionRepoInstance = Container.get(sectionRepoClass);
         Container.set("SectionRepo", sectionRepoInstance);
         sectionRepoInstance = Container.get("SectionRepo");
     sinon.stub(s, "findByDomainId").returns( Section.create(sectionDTO,new UniqueEntityID( sectionDTO.id)).getValue());

 

     const Service = new SectionService(sectionRepoInstance as ISectionRepo );

     let res = await Service.updateSection(sectionDTO as ISectionDTO );

sinon.assert.match((res.getValue() as ISectionDTO),( sectionDTO as ISectionDTO ));
});




});