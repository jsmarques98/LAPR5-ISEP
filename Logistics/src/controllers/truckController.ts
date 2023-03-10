import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';

import { Result } from "../core/logic/Result";
import { json } from 'body-parser';
import { STATUS_CODES } from 'http';

@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
      
      if (truckOrError.isFailure) {
        return res.status(402).send(truckOrError.error);
      }

      const truckDTO = truckOrError.getValue();
     
      return res.status(201).json( truckDTO);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
      if (truckOrError.isFailure) {
        return res.status(404).send();
      }
      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getTruck(req.body.plate);

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllTrucks(req: Request, res: Response, next: NextFunction) {

    try {
      
      const roleOrError = await this.truckServiceInstance.getAllTrucks() as Result<ITruckDTO[]>

      if (roleOrError.isFailure) {
          return res.status(404).send();
      }

      const rolePosts = roleOrError.getValue();
      
      return  res.json(rolePosts).status(200);
    }
    catch (e) {
      return next(e);
    }
  };
  public async deleteByPlatepublic(req: Request, res: Response, next: NextFunction) {
  try {
    const truckOrError = await this.truckServiceInstance.deleteByPlate(req.body.Plate);

 
    const mensagem = truckOrError.getValue();
    return res.json( mensagem ).status(200);
  }
  catch (e) {
    return next(e);
  }
};

public async inativeTruck(req: Request, res: Response, next: NextFunction) {
  try {
    const truckOrError = await this.truckServiceInstance.inativeTruck(req.body.Plate);

    if (truckOrError.isFailure) {
      return res.status(400).send(truckOrError.error);
  }
    return res.json( truckOrError.getValue() ).status(200);
  }
  catch (e) {
    return next(e);
  }
};

public async activateTruck(req: Request, res: Response, next: NextFunction) {
  try {
    const truckOrError = await this.truckServiceInstance.activateTruck(req.body.Plate);

    if (truckOrError.isFailure) {
      return res.status(400).send(truckOrError.error);
  }
    return res.json( truckOrError.getValue() ).status(200);
  }
  catch (e) {
    return next(e);
  }
};

}