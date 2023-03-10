import { Inject, Service } from 'typedi';
import config from "../../config";
import IPlanningDTO from '../dto/IPlanningDTO';
import IPlanningService from './IServices/IPlanningService';
import { Result } from "../core/logic/Result";
import ITruckService from './IServices/ITruckService';
import ISectionServiice from './IServices/ISectionService';
import { Planning } from '../domain/planning/planning';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { PlanningMap } from '../mappers/PlanningMap';
import IPlanningGeneticDTO from '../dto/IPlanningGeneticDTO';
import IPlanningRepo from './IRepos/IPlanningRepo';


const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class PlanningService implements IPlanningService {

  constructor(
    @Inject(config.repos.planning.name) private planningRepo : IPlanningRepo,
    @Inject(config.services.truck.name) private truckServiceInstance : ITruckService,
    @Inject(config.services.section.name) private sectionServiceInstance : ISectionServiice
  ) {}


  public async loadTrucksKnowledgeDataBase(){
    let route;
      let trucks=(await this.truckServiceInstance.getAllTrucks()).getValue();
      let i;
       for(i=0;i<trucks.length ;i++){
       let  truck=trucks[i];
        await axios.get(config.planningAPIURL+config.loadTruckURL,{ params: { truckName: truck.name,tara:truck.tare,
          capacidade_carga:truck.payLoad,carga_total_baterias:truck.maxBattery, 
          autonomia:truck.autonomy,t_recarr_bat_20a80:truck.baterryChargingTime} }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});

       }

  }


  public async loadDeliveriesKnowledgeDataBase(){
    let route;
    let route2;
      let deliveries= await axios.get(config.WarehouseManagementApiURL+config.deliveriesAPIWarehouseManagementURL).then((response) => {route = response.data}).catch(() => {
        });

       let i;

       for(i=0;i<route.length ;i++){
        let  delivery=route[i];
        await axios.get(config.planningAPIURL+config.loadDeliveryURL,{ params: { deliveryId: delivery.id,date:delivery.deliveryDate,
          massa:parseInt(delivery.totalWeight),armazem:delivery.deliveryWarehouseId, 
          loadTime:delivery.loadTime,unloadTime:delivery.unloadTime} }).
          then((response) => {route2 = response.data;}).catch((e) => {});
       }
       
  }

  public async loadWarehousesKnowledgeDataBase(){
    let route;
    let route2;

      let warehouses= await axios.get(config.WarehouseManagementApiURL+config.warehousesAPIWarehouseManagementURL).then((response) => {route = response.data}).catch(() => {
        throw new Error("Delivery does not exist!");
        });

       let i;

       for(i=0;i<route.length ;i++){
     
        let  warehouse=route[i];
     
        await axios.get(config.planningAPIURL+config.loadWarehouseURL,{ params: { nameWarehouse: warehouse.designation,idWarehouse:warehouse.id,
        } }).
          then((response) => {route2 = response.data;}).catch((e) => {console.log(e)});
       }
       
  }

  public async loadSectionsKnowledgeDataBase(){
    let route;
      let sections=(await this.sectionServiceInstance.getAllSections()).getValue();
      let i;



       for(i=0;i<sections.length ;i++){
       let  section=sections[i];

        await axios.get(config.planningAPIURL+config.loadSectionURL,{ params: { truckName: "eTruck01",origin:section.warehouseOrigin,

          destin:section.warehouseDestiny,tempo:section.duration, 

          energia:section.energySpent,tempoExtra:section.extraTime} }).

      then((response) => {route = response.data;}).catch((e) => {console.log(e)});

  }
}

public async deleteKnowledgeDataBase(){
  let route;
    await axios.get(config.planningAPIURL+config.eliminarDadosURL,{ params: {} }).
  then((response) => {route = response.data;}).catch((e) => {console.log(e)});
}


  public async getBestRoute(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {

    this.deleteKnowledgeDataBase()
    this.loadWarehousesKnowledgeDataBase()
    this.loadTrucksKnowledgeDataBase()
    this.loadDeliveriesKnowledgeDataBase()
  
    await this.loadSectionsKnowledgeDataBase()

    try {
      let route;
      

      await axios.get(config.planningAPIURL+config.planningAPIBestRoutesURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route[0],time:route[1]} as IPlanningDTO;
      this.createPlanning(result)
      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getRouteHeuristicTime(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    this.deleteKnowledgeDataBase()
    this.loadWarehousesKnowledgeDataBase()
    this.loadTrucksKnowledgeDataBase()
   this.loadDeliveriesKnowledgeDataBase()
   await this.loadSectionsKnowledgeDataBase()
    try {
      let route;

      await axios.get(config.planningAPIURL+config.planningAPIHeuristicTimeURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});

      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route[0],time:route[1]} as IPlanningDTO;
  
      this.createPlanning(result)
      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getRouteHeuristicMass(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    this.deleteKnowledgeDataBase()
    this.loadWarehousesKnowledgeDataBase()
    this.loadTrucksKnowledgeDataBase()
   this.loadDeliveriesKnowledgeDataBase()
   await this.loadSectionsKnowledgeDataBase()
    try {
      let route;
      await axios.get(config.planningAPIURL+config.planningAPIHeuristicMassURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route[0],time:route[1]} as IPlanningDTO;
  
      this.createPlanning(result)
      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getRouteHeuristicTimeAndMass(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    this.deleteKnowledgeDataBase()
    this.loadWarehousesKnowledgeDataBase()
    this.loadTrucksKnowledgeDataBase()
   this.loadDeliveriesKnowledgeDataBase()
   await this.loadSectionsKnowledgeDataBase()
    try {
      let route;



      await axios.get(config.planningAPIURL+config.planningAPIHeuristicTimeAndMassURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});

      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route[0],time:route[1]} as IPlanningDTO;
      this.createPlanning(result)

      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async createPlanning(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {

    let planningOrError;

    planningOrError= await Planning.create(planningDTO,new UniqueEntityID());

    if (planningOrError.isFailure) {
      return Result.fail<IPlanningDTO>(planningOrError.errorValue());
    }

    const planningResult = planningOrError.getValue();

    this.planningRepo.save(planningResult);
  
    const planningDtoResult = PlanningMap.toDTO( planningResult ) as IPlanningDTO;
    return Result.ok<IPlanningDTO>( planningDtoResult )

}


public async getGenetic(planningDTO : IPlanningGeneticDTO): Promise<Result<IPlanningGeneticDTO>> {
  this.deleteKnowledgeDataBase()
  this.loadWarehousesKnowledgeDataBase()
  this.loadTrucksKnowledgeDataBase()
  this.loadDeliveriesKnowledgeDataBase()
 await this.loadSectionsKnowledgeDataBase()
  try {
    let route;

    await axios.get(config.planningAPIURL+config.planningAPIGeneticURL,{ params: {
       date: planningDTO.deliveryDate , numberG: planningDTO.numGer, 
    dimensaoP: planningDTO.dimPop, percentagemC: planningDTO.perC, 
    percentagemM: planningDTO.perM, valorReferencia: planningDTO.refVal} }).
    then((response) => {route = response.data;}).catch((e) => {console.log(e)});
for (let index = 0; index < route.length; index+=2){
  const result = {truckName: route[index+1], deliveryDate: planningDTO.deliveryDate, deliveryId: route[index],time:null} as IPlanningDTO;
  this.createPlanning(result)

}
const result = { deliveryDate: planningDTO.deliveryDate, numGer:planningDTO.numGer, dimPop:planningDTO.dimPop, perC:planningDTO.perC, perM:planningDTO.perM, refVal:planningDTO.refVal, routeList: route} as IPlanningGeneticDTO;

   
    return Result.ok<IPlanningGeneticDTO>(result);
} catch(e) {
    throw e;
}

}

  public async getPlannings(): Promise<Result<IPlanningDTO[]>> {
    try {
      const allPlanning = await this.planningRepo.findAll();
      if (allPlanning === null) {
          return Result.fail<IPlanningDTO[]>("There is no registred plannings.");
      }

      const resultado = allPlanning.map((allPlanning) => PlanningMap.toDTO(allPlanning) as IPlanningDTO);
      return Result.ok<IPlanningDTO[]>(resultado);
  } catch(e) {
      throw e;
  }
  }
}
