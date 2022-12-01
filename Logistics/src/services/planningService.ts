import { Service } from 'typedi';
import config from "../../config";
import IPlanningDTO from '../dto/IPlanningDTO';
import IPlanningService from './IServices/IPlanningService';
import { Result } from "../core/logic/Result";


const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
  ) {}



  public async getBestRoute(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      let route;

      await axios.get(config.planningAPIBestRoutesURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, routeList: route} as IPlanningDTO;

      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getRouteHeuristicTime(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      let route;

      await axios.get(config.planningAPIHeuristicTimeURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, routeList: route} as IPlanningDTO;

      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getRouteHeuristicMass(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      let route;
      await axios.get(config.planningAPIHeuristicMassURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, routeList: route} as IPlanningDTO;

      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

  public async getRouteHeuristicTimeAndMass(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      let route;

      await axios.get(config.planningAPIHeuristicTimeAndMassURL,{ params: { truckName: planningDTO.truckName, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch((e) => {console.log(e)});
    
      
      const result = {truckName: planningDTO.truckName, deliveryDate: planningDTO.deliveryDate, routeList: route} as IPlanningDTO;

      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

}

function displayOutput(response: any) {
  throw new Error('Function not implemented.');
}
