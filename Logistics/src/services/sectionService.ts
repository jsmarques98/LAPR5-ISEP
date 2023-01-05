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

  public async getSections(skip:number,limit:number): Promise<Result<ISectionDTO[]>> {
    try {
      
      const section = await this.sectionRepo.find(skip,limit);
   
 
      if (section === null) {
          return Result.fail<ISectionDTO[]>("Não existem secções registados.");
      }

      const result = section.map((allSections) => SectionMap.toDTO(allSections) as ISectionDTO);
      return Result.ok<ISectionDTO[]>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getSection(id: string): Promise<Result<ISectionDTO>> {
    try {
      const section = await this.sectionRepo.findByDomainId(new UniqueEntityID(id));

      if (section === null) {
        return Result.fail<ISectionDTO>("section not found");
      }
      else {
        const truckDTOResult = SectionMap.toDTO( section ) as ISectionDTO;
        return Result.ok<ISectionDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
  
  public async deleteById(id: string): Promise<Result<String>> {
    try {

      let boolean = await this.sectionRepo.deleteById(new UniqueEntityID(id));

      if (boolean===true) {
        return Result.ok<String>("Section apagada com suecesso");
      }

      else {
      
        return Result.ok<String>("Não existe uma Section com o id  inserido");
        }
    } catch (e) {
      throw e;
    }
  }


  public async createSection(sectionDTO: ISectionDTO): Promise<Result<ISectionDTO>> {
    try {

     await this.checkIfWarehousesExist(sectionDTO); 
      let sectionOrError;

      sectionOrError = await Section.create( sectionDTO);
        
      if (sectionOrError.isFailure) {
    
        return Result.fail<ISectionDTO>(sectionOrError.error);
      }

      const sectionResult = sectionOrError.getValue();
      
      await this.sectionRepo.save(sectionResult);
      const sectionDTOResult = SectionMap.toDTO( sectionResult ) as ISectionDTO;
      return Result.ok<ISectionDTO>( sectionDTOResult )
    } catch (e) {
      return Result.fail<ISectionDTO>(e.message);
    }
  }

  public async updateSection(sectionDTO: ISectionDTO): Promise<Result<ISectionDTO>> {
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

   await axios.get(config.WarehouseManagementApiURL+config.warehousesAPIWarehouseManagementURL+sectionDTO.warehouseOrigin)
  .then((response) => {warehouseoOriginId = response.data.id;})
  .catch((e) => {
    throw new Error("Origin Warehouse does not exist!");
  });

  await axios.get(config.WarehouseManagementApiURL+config.warehousesAPIWarehouseManagementURL+sectionDTO.warehouseDestiny)
  .then((response) => {warehouseDestinyId = response.data.id;})
  .catch(() => {
    throw new Error("Destiny Warehouse does not exist!");
  }); 
  }

}
function displayOutput(response: any) {
  throw new Error('Function not implemented.');
}
