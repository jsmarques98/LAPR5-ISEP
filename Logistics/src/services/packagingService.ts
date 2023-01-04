import { Service, Inject } from 'typedi';
import config from "../../config";
import IPackagingDTO from '../dto/IPackagingDTO';
import { Packaging } from "../domain/packaging/packaging";
import IPackagingRepo from './IRepos/IPackagingRepo';
import ITruckRepo from './IRepos/ITruckRepo';
import IPackagingService from './IServices/IPackagingService';
import { Result } from "../core/logic/Result";
import { PackagingMap } from "../mappers/PackagingMap";
import { Position } from '../domain/packaging/position';
import { response } from 'express';
import { threadId } from 'worker_threads';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { TruckId } from '../domain/trucks/truckId';
import { Plate } from '../domain/trucks/plate';

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


@Service()
export default class PackagingService implements IPackagingService {
  constructor(
      @Inject(config.repos.packaging.name) private packagingRepo : IPackagingRepo,
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}



  public async getAllPackagings(): Promise<Result<IPackagingDTO[]>> {
    try {
      const allPackaging = await this.packagingRepo.findAll();
      if (allPackaging === null) {
          return Result.fail<IPackagingDTO[]>("Não existem empacotamentos registados.");
      }

      const result = allPackaging.map((allPackaging) => PackagingMap.toDTO(allPackaging) as IPackagingDTO);
      return Result.ok<IPackagingDTO[]>(result);
  } catch(e) {
      throw e;
  }

  }


  public async createPackaging(packagingDto: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      await this.checkIfTruckExist(packagingDto); 

      await this.checkIfDeliveryExist(packagingDto); 

      let packagingOrError;

      if(packagingDto.id===undefined){
        packagingOrError = await Packaging.create(packagingDto);
        
       }else{
        packagingOrError= await Packaging.create(packagingDto,new UniqueEntityID( packagingDto.id));

       }
      if (packagingOrError.isFailure) {
        return Result.fail<IPackagingDTO>(packagingOrError.errorValue());
      }
      const packagingResult = packagingOrError.getValue();
     let aux= await this.packagingRepo.exists(packagingResult);
     if((aux).valueOf()){
      return Result.fail<IPackagingDTO>(  ("Ja existe um packaging com este domainId"));
     }else{
      await this.packagingRepo.save(packagingResult);
    }
      const packagingDtoResult = PackagingMap.toDTO( packagingResult ) as IPackagingDTO;
      return Result.ok<IPackagingDTO>( packagingDtoResult )
    } catch (e) {


      throw e;
    }
  }

  public async updatePackaging(packagingDto: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      const packaging = await this.packagingRepo.findByDomainId(packagingDto.id);

      if (packaging === null) {
        return Result.fail<IPackagingDTO>("packaging not found");
      }
      else {
        packaging.props.truckPlate=Plate.create(packagingDto.truckPlate).getValue();
        packaging.props.position=Position.create(packagingDto.positionX,packagingDto.positionY,packagingDto.positionZ).getValue();
        packaging.props.deliveryId=packagingDto.deliveryId;
        
        await this.packagingRepo.save(packaging);

        const packagingDtoResult = PackagingMap.toDTO( packaging ) as IPackagingDTO;
        return Result.ok<IPackagingDTO>( packagingDtoResult )
        }
    } catch (e) {
      throw e;
    }
  }

  private async checkIfTruckExist(packagingDTO : IPackagingDTO){
    if(this.truckRepo.findByPlate(Plate.create(packagingDTO.truckPlate).getValue())==null){
      throw new Error("Truck does not exist!");
    }
  }

  private async checkIfDeliveryExist(packagingDTO : IPackagingDTO){
    var deliveryId;

   await axios.get(config.WarehouseManagementApiURL+config.deliveriesAPIWarehouseManagementURL+packagingDTO.deliveryId)
  .then((response) => {deliveryId = response.data.id;})
  .catch(() => {
    throw new Error("Delivery does not exist!");
    });
  }

  public async getPackaging(): Promise<Result<IPackagingDTO>>{
        return null;
  }

}

function displayOutput(response: any) {
  throw new Error('Function not implemented.');
}

