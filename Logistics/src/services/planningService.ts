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


const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class PlanningService implements IPlanningService {
  planningRepo: any;
  constructor(
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
      console.log(planningDTO);
      

      await axios.get(config.planningAPIURL+config.planningAPIBestRoutesURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {console.log(response.data)
      ,route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route[0],time:route[1]} as IPlanningDTO;

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

      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route} as IPlanningDTO;
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
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route} as IPlanningDTO;

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

      const result = { truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, deliveryId: route } as unknown as IPlanningDTO;

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

    let aux= await this.planningRepo.exists(planningResult);
    
    if((aux).valueOf()){
      return Result.fail<IPlanningDTO>(  ("Ja existe um planning com este domainId"));
     }else{
      await this.planningRepo.save(planningResult);
    }
      const planningDtoResult = PlanningMap.toDTO( planningResult ) as IPlanningDTO;
      return Result.ok<IPlanningDTO>( planningDtoResult )

}


  public async getGenetic(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    this.deleteKnowledgeDataBase()
    this.loadWarehousesKnowledgeDataBase()
    this.loadTrucksKnowledgeDataBase()
    this.loadDeliveriesKnowledgeDataBase()
    await this.loadSectionsKnowledgeDataBase()
    try {
      let route;

      await axios.get(config.planningAPIURL+config.planningAPIGeneticURL,{ params: {
         date: '05/12/2022' , numberG: 6, 
      dimensaoP: 7, percentagemC: 50, 
      percentagemM: 30, valorReferencia: 340} }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
      const result = { deliveryId: route} as IPlanningDTO;
      console.log(route)
      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }
}
