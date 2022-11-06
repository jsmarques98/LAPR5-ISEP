import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckDTO from "../dto/ITruckDTO";
import { Truck } from "../domain/trucks/truck";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TruckMap extends Mapper<Truck> {
  
  public static toDTO( truck: Truck): ITruckDTO {
    return {
      domainId: truck.id.toString(),
      name: truck.name.toString(),
      maxBattery: truck.maxBattery.value, 
      autonomy: truck.autonomy.value,
      payLoad: truck.payLoad.value,
      tare: truck.tare.value,
      baterryChargingTime: truck.baterryChargingTime.value,
      plate: truck.plate.toString(),
    } as ITruckDTO;
  }

  public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
   
    const truckOrError = Truck.create(
        truck,
      new UniqueEntityID(truck.domainId)
    );

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence (truck: Truck): any {

    return {
      domainId: truck.id.toString(),
      name: truck.name,
      maxBattery: truck.maxBattery.value, 
      autonomy: truck.autonomy.value,
      payLoad: truck.payLoad.value,
      tare: truck.tare.value,
      baterryChargingTime: truck.baterryChargingTime.value,
      plate: truck.plate.value,
    }
  }
}