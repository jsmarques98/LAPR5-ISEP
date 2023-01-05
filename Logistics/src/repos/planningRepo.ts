import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from "../domain/planning/planning";
import { PlanningMap } from "../mappers/PlanningMap";

import { Collection, Document, FilterQuery, Model } from 'mongoose';
import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';
import { Plate } from '../domain/trucks/plate';


@Service()
export default class planningRepo implements IPlanningRepo{
  private models: any;

  constructor(
    @Inject('planningSchema') private planningSchema : Model<IPlanningPersistence & Document>,
  ) {}
  

  public async exists(planning: Planning): Promise<boolean> {

    const plateX = planning.truckPlate instanceof Plate ? (<Plate>planning.truckPlate).value : planning.truckPlate;
    const dateX = planning.deliveryDate instanceof String ? (<String>planning.deliveryDate) : planning.deliveryDate;


    const query = { truckPlate: plateX, deliveryDate: dateX}; 
    
    const planningDocument = await this.planningSchema.findOne( query as FilterQuery<IPlanningRepo & Document>);

    return !!planningDocument === true;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async save (planning: Planning): Promise<Planning> {
    
    try {
      if (!this.exists(planning)) {
       
        const rawPlanning: any = PlanningMap.toPersistence(planning);
        const planningCreated = await this.planningSchema.create(rawPlanning);

        return PlanningMap.toDomain(planningCreated);
      } else {
        const query = { domainId: planning.id.toString()}; 
        const planningDocument = await this.planningSchema.findOne(query);
        
        planningDocument.deliveryDate = planning.deliveryDate;
        planningDocument.time = planning.time;

        await planningDocument.save();
        return planning;
      }
    } catch (err) {
      throw err;
    }
  }
}