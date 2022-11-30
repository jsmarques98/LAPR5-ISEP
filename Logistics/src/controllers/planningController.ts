import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPlanningService from '../services/IServices/IPlanningService';
import IPlanningDTO from '../dto/IPlanningDTO';

import { Result } from "../core/logic/Result";
import IPlanningController from './IControllers/IPlanningController';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class PlanningController implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.planning.name) private planningServiceInstance : IPlanningService
  ) {}

  public async getAllRoutes(req: Request, res: Response, next: NextFunction) {
    try {
      const planningDTO = {truckPlate: req.query.truckPlate, deliveryDate:req.query.deliveryDate, routeList: []} as IPlanningDTO;
      const PlanningOrError = await this.planningServiceInstance.getBestRoute(planningDTO) as Result<IPlanningDTO>

      if (PlanningOrError.isFailure) {
          return res.status(400).send();
      }

      const rolePosts = PlanningOrError.getValue();
      res.status(200);
      return  res.json(rolePosts);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  };


}