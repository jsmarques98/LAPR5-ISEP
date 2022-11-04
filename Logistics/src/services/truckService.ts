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
import { MaxBattery } from '../domain/trucks/maxBattery';

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}

  public async getTruck( truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(truckId);

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
      const truckOrError = await Truck.create( truckDTO );
      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }
      const truckResult = truckOrError.getValue();
      await this.truckRepo.save(truckResult);
      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(truckDTO.plate);

      if (truck === null) {
        return Result.fail<ITruckDTO>("truck not found");
      }
      else {
       
        truck.name = truckDTO.name;
        truck.maxBattery=MaxBattery.create(truckDTO.maxBattery).getValue(); 
        truck.autonomy=Autonomy.create(truckDTO.autonomy).getValue();
        truck.payLoad=PayLoad.create(truckDTO.payLoad).getValue();
        truck.tare=Tare.create(truckDTO.tare).getValue();
        truck.baterryChargingTime=BaterryChargingTime.create(truckDTO.baterryChargingTime).getValue();
       
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
