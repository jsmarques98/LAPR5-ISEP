import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/trucks/truck";
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";
import { Autonomy } from '../domain/trucks/autonomy';
import { Tare } from '../domain/trucks/tare';
import { BaterryChargingTime } from '../domain/trucks/baterryChargingTime';
import { PayLoad } from '../domain/trucks/payLoad';
import { Plate } from '../domain/trucks/plate';
import { MaxBattery } from '../domain/trucks/maxBattery';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}

  public async getTruck( plate: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(Plate.create(plate).getValue());

      if (truck === null) {
        return Result.fail<ITruckDTO>("truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const alllTruck = await this.truckRepo.findAll();
      if (alllTruck === null) {
          return Result.fail<ITruckDTO[]>("There is no registred trucks.");
      }

      const resultado = alllTruck.map((alllTruck) => TruckMap.toDTO(alllTruck) as ITruckDTO);
      return Result.ok<ITruckDTO[]>(resultado);
  } catch(e) {
      throw e;
  }
    
  }


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      let truckOrError;
      if(truckDTO.domainId===undefined){
       truckOrError = await Truck.create( truckDTO );
       
      }else{
       truckOrError = await Truck.create( truckDTO ,new UniqueEntityID( truckDTO.domainId));
      }
      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }
      const truckResult = truckOrError.getValue();
      let aux =await this.truckRepo.exists(truckResult);
      if((aux).valueOf()){
        return Result.fail<ITruckDTO>("Ja existe um camiao com este domainId");
    }else{
      await this.truckRepo.save(truckResult);
    }
      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
  

      const truck = await this.truckRepo.findByPlate(Plate.create(truckDTO.plate).getValue());
   

      if (truck === null) {
        return Result.fail<ITruckDTO>("truck not found");
      }
      else {

        if(truckDTO.name!=null){
        truck.name = truckDTO.name;
        }
        if(truckDTO.maxBattery!=null){
        truck.maxBattery=MaxBattery.create(truckDTO.maxBattery).getValue(); 
        }
        if(truckDTO.autonomy!=null){
        truck.autonomy=Autonomy.create(truckDTO.autonomy).getValue();
        }
         if(truckDTO.payLoad!=null){
        truck.payLoad=PayLoad.create(truckDTO.payLoad).getValue();
         }
        if(truckDTO.tare!=null){
        truck.tare=Tare.create(truckDTO.tare).getValue();
        }
        if(truckDTO.baterryChargingTime!=null){
        truck.baterryChargingTime=BaterryChargingTime.create(truckDTO.baterryChargingTime).getValue();
        }

        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
