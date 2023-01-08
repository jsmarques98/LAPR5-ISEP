import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPlanningService from '../services/IServices/IPlanningService';
import IPlanningDTO from '../dto/IPlanningDTO';

import { Result } from "../core/logic/Result";
import IPlanningController from './IControllers/IPlanningController';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IPlanningGeneticDTO from '../dto/IPlanningGeneticDTO';

@Service()
export default class PlanningController implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.planning.name) private planningServiceInstance : IPlanningService
  ) {}

  public async getBestRoute(req: Request, res: Response, next: NextFunction) {

    try {
      const planningDTO = {truckName: req.query.truckName, deliveryDate:req.query.deliveryDate, deliveryId: []} as IPlanningDTO;
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


  public async getRouteHeuristicTime(req: Request, res: Response, next: NextFunction) {
    try {
      const planningDTO = {truckName: req.query.truckName, deliveryDate:req.query.deliveryDate, deliveryId: []} as IPlanningDTO;
      const PlanningOrError = await this.planningServiceInstance.getRouteHeuristicTime(planningDTO) as Result<IPlanningDTO>

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

  public async getRouteHeuristicMass(req: Request, res: Response, next: NextFunction) {
    try {

      const planningDTO = {truckName: req.query.truckName, deliveryDate:req.query.deliveryDate, deliveryId: []} as IPlanningDTO;
      const PlanningOrError = await this.planningServiceInstance.getRouteHeuristicMass(planningDTO) as Result<IPlanningDTO>

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

  public async getRouteHeuristicTimeAndMass(req: Request, res: Response, next: NextFunction) {
    try {
      const planningDTO = {truckName: req.query.truckName, deliveryDate:req.query.deliveryDate, deliveryId: []} as IPlanningDTO;
      const PlanningOrError = await this.planningServiceInstance.getRouteHeuristicTimeAndMass(planningDTO) as Result<IPlanningDTO>

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
  public async getGenetic(req: Request, res: Response, next: NextFunction) {
    try {
      const planningDTO = {deliveryDate: req.query.deliveryDate, numGer:req.query.numGer,dimPop:req.query.dimPop,perC:req.query.perC,perM:req.query.perM,refVal:req.query.refVal, routeList:[] } as IPlanningGeneticDTO;
      

      const PlanningOrError = await this.planningServiceInstance.getGenetic(planningDTO) as Result<IPlanningGeneticDTO>

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

  public async getPlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningError = await this.planningServiceInstance.getPlannings()as Result<IPlanningDTO[]>;

      if (planningError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = planningError.getValue();
      return res.json( truckDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }
    


}