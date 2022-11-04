import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ISectionController from '../../controllers/IControllers/ISectionController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/Sections', route);
  const ctrl = Container.get(config.controllers.section.name) as ISectionController;

  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        warehouseOrigin: Joi.string().required(),
        warehouseDestiny: Joi.string().required(),
        duration: Joi.string().required(),
        distance: Joi.string().required(),
        energySpent: Joi.string().required(),
        extraTime: Joi.string().required(),

      })
    }),
    (req, res, next) => ctrl.createSection(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        duration: Joi.string().required(),
        distance: Joi.string().required(),
        energySpent: Joi.string().required(),
        extraTime: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateSection(req, res, next) );

    route.get('',
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.getAllSections(req, res, next));
};

