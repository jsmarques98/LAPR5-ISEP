import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import ISectionController from "./IControllers/ISectionController";
import ISectionService from '../services/IServices/ISectionService';
import ISectionDTO from '../dto/ISectionDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class SectionController implements ISectionController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.section.name) private sectionServiceInstance : ISectionService
  ) {}

  public async createSection(req: Request, res: Response, next: NextFunction) {
    try {
      const sectionOrError = await this.sectionServiceInstance.createSection(req.body as ISectionDTO) as Result<ISectionDTO>;
      if (sectionOrError.isFailure) {
        
 
        return res.status(402).send(sectionOrError.error);
      }
      const sectionDTO = sectionOrError.getValue();
      return res.json( sectionDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateSection(req: Request, res: Response, next: NextFunction) {
    try {
      const sectionOrError = await this.sectionServiceInstance.updateSection(req.body as ISectionDTO) as Result<ISectionDTO>;
      if (sectionOrError.isFailure) {
        return res.status(404).send();
      }

      const sectionDTO = sectionOrError.getValue();
      return res.json( sectionDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllSections(req: Request, res: Response, next: NextFunction) {
    try {
      
      const sectionOrError = await this.sectionServiceInstance.getAllSections() as Result<ISectionDTO[]>

      if (sectionOrError.isFailure) {
          return res.status(400).send();
      }

      const sectionPosts = sectionOrError.getValue();
      return  res.json(sectionPosts).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getSection(req: Request, res: Response, next: NextFunction) {
    try {
      
      const sectionOrError = await this.sectionServiceInstance.getSection(req.body.id) as Result<ISectionDTO>

      if (sectionOrError.isFailure) {
          return res.status(404).send();
      }

      const sectionPosts = sectionOrError.getValue();
      return  res.json(sectionPosts).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      
      const sectionOrError = await this.sectionServiceInstance.deleteById(req.body.id) 

      const mensagem = sectionOrError.getValue();
      return  res.json(mensagem).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

}