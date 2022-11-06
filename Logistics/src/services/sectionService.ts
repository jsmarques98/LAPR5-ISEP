import { Service, Inject } from 'typedi';
import config from "../../config";
import ISectionDTO from '../dto/ISectionDTO';
import { Section } from "../domain/sections/section";
import ISectionRepo from './IRepos/ISectionRepo';
import ISectionService from './IServices/ISectionService';
import { Result } from "../core/logic/Result";
import { SectionMap } from "../mappers/SectionMap";
import { duration } from 'moment';
import { Duration } from '../domain/sections/duration';
import { Distance } from '../domain/sections/distance';
import { EnergySpent } from '../domain/sections/energySpent';
import { ExtraTime } from '../domain/sections/extraTime';
import { response } from 'express';
import { threadId } from 'worker_threads';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class SectionService implements ISectionService {
  constructor(
      @Inject(config.repos.section.name) private sectionRepo : ISectionRepo
  ) {}

  public async getAllSections(): Promise<Result<ISectionDTO[]>> {
    try {
      const allSections = await this.sectionRepo.findAll();

      if (allSections === null) {
          return Result.fail<ISectionDTO[]>("Não existem secções registados.");
      }

      const result = allSections.map((allSections) => SectionMap.toDTO(allSections) as ISectionDTO);
      return Result.ok<ISectionDTO[]>(result);
  } catch(e) {
      throw e;
  }

  }


  public async createSection(sectionDTO: ISectionDTO): Promise<Result<ISectionDTO>> {
    try {
      await this.checkIfWarehousesExist(sectionDTO); 
      let sectionOrError;

      if(sectionDTO.id===undefined){
        sectionOrError = await Section.create( sectionDTO);
        
       }else{
        sectionOrError= await Section.create( sectionDTO,new UniqueEntityID( sectionDTO.id));

       }
      if (sectionOrError.isFailure) {
        return Result.fail<ISectionDTO>(sectionOrError.errorValue());
      }

      const sectionResult = sectionOrError.getValue();
      
      await this.sectionRepo.save(sectionResult);
      const sectionDTOResult = SectionMap.toDTO( sectionResult ) as ISectionDTO;
      return Result.ok<ISectionDTO>( sectionDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateSection(sectionDTO: ISectionDTO): Promise<Result<ISectionDTO>> {
    console.log("service")
    try {
      const section = await this.sectionRepo.findByDomainId(sectionDTO.id);

      if (section === null) {
        return Result.fail<ISectionDTO>("section not found");
      }
      else {
        section.props.distance=Distance.create(sectionDTO.distance).getValue();
        section.props.duration=Duration.create(sectionDTO.duration).getValue();
        section.props.energySpent=EnergySpent.create(sectionDTO.energySpent).getValue();
        section.props.extraTime=ExtraTime.create(sectionDTO.extraTime).getValue();
     
        await this.sectionRepo.save(section);

        const sectionDTOResult = SectionMap.toDTO( section ) as ISectionDTO;
        return Result.ok<ISectionDTO>( sectionDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async checkIfWarehousesExist(sectionDTO : ISectionDTO){
    var warehouseDestinyId;
    var warehouseoOriginId;

   await axios.get(config.warehousesAPIWarehouseManagementURL+sectionDTO.warehouseOrigin)
  .then((response) => {warehouseoOriginId = response.data.id;})
  .catch(() => {
    throw new Error("Origin Warehouse does not exist!");
});

  await axios.get(config.warehousesAPIWarehouseManagementURL+sectionDTO.warehouseDestiny)
  .then((response) => {warehouseDestinyId = response.data.id;})
  .catch(() => {
    throw new Error("Destiny Warehouse does not exist!");
}); 
  }

}
function displayOutput(response: any) {
  throw new Error('Function not implemented.');
}
