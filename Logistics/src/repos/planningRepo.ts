import { Service, Inject } from 'typedi';



import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning/planning';
import { PlanningId } from '../domain/planning/planningId';
import { Plate } from '../domain/trucks/plate';
import { PlanningMap } from '../mappers/PlanningMap';
import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';

@Service()
export default class PlanningRepo implements IPlanningRepo {



  constructor(
    
    @Inject('planningSchema') private planningSchema : Model<IPlanningPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }



   
  public async save (planning: Planning): Promise<Planning> {

    const plateX = planning.truckName instanceof String ? (<String>planning.truckName) : planning.truckName;
    const dateX = planning.deliveryDate instanceof String ? (<String>planning.deliveryDate) : planning.deliveryDate;

    const query = { truckPlate: plateX, deliveryDate: dateX}; 
     let planningDocument = await this.planningSchema.findOne( query as FilterQuery<IPlanningRepo & Document>);

   
    try {
      if(planningDocument===null){
     
        
      console.log("save");
      
          const rawPlanning: any = PlanningMap.toPersistence(planning);
          console.log(rawPlanning)
          const planningCreated = await this.planningSchema.create(rawPlanning);
          console.log(planningCreated)
          return PlanningMap.toDomain(planningCreated);
        
    
    }else{
      console.log("update");
      ( planningDocument).deliveryId=planning.deliveryId;
      ( planningDocument).time=planning.time;
       planningDocument.save();
      return planning;


    } 
   } catch (err) {
        throw err;
      }
  }
  

  public async findByDomainId (planningId: PlanningId
   | string): Promise<Planning> {
    const query = { domainId: planningId};
    const truckRecord = await this.planningSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );


    if( truckRecord != null) {

     
      return PlanningMap.toDomain(truckRecord);
    }
    else
      return null;
  }

  


}