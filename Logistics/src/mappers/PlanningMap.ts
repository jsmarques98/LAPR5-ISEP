import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';

import IPlanningDTO from "../dto/IPlanningDTO";
import { Planning } from "../domain/planning/planning";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PlanningMap extends Mapper<Planning> {
  
  public static toDTO( planning: Planning): IPlanningDTO {
    return {
      id: planning.id.toString(),
      truckPlate: planning.truckPlate.toString(),
      deliveryId: planning.deliveryId,
      deliveryDate: planning.deliveryDate.toString(),
      time: planning.time,

    
    } as IPlanningDTO;
  }

  public static toDomain (planning: any | Model<IPlanningPersistence & Document> ): Planning {

    const planningOrError = Planning.create(
        planning,
      new UniqueEntityID(planning.domainId)
    );

    planningOrError.isFailure ? console.log(planningOrError.error) : '';
    return planningOrError.isSuccess ? planningOrError.getValue() : null;
  }

  public static toPersistence (planning: Planning): any {
    return {
      domainId: planning.id.toString(),
      truckPlate: planning.truckPlate.toString(),
      deliveryId: planning.deliveryId, 
      time: planning.time,

    }
  }
}