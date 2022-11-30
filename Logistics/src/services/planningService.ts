import { Service, Inject } from 'typedi';
import config from "../../config";
import IPlanningDTO from '../dto/IPlanningDTO';
import ITruckRepo from './IRepos/ITruckRepo';
import IPlanningService from './IServices/IPlanningService';
import { Result } from "../core/logic/Result";
import { response } from 'express';
import { threadId } from 'worker_threads';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { TruckId } from '../domain/trucks/truckId';

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
  ) {}



  public async getBestRoute(planningDTO : IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      let route;


      await axios.get(config.planningAPIAllPosibleRoutesURL,{ params: { plate: planningDTO.truckPlate, deliveryDate:planningDTO.deliveryDate } }).
      then((response) => {route = response.data;}).catch(() => {});
      route.forEach(function(item,puta,array) {
        console.log(item,puta,array);
      });
      
      const result = {truckPlate: planningDTO.truckPlate, deliveryDate: planningDTO.deliveryDate, routeList: route} as IPlanningDTO;

      return Result.ok<IPlanningDTO>(result);
  } catch(e) {
      throw e;
  }

  }

}

function displayOutput(response: any) {
  throw new Error('Function not implemented.');
}

