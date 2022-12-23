import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';

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
        warehouseOrigin: Joi.string().required(),
        warehouseDestiny: Joi.string().required(),
        duration: Joi.number().required(),
        distance: Joi.number().required(),
        energySpent: Joi.number().required(),
        extraTime: Joi.number().required(),

      })
    }),
    (req, res, next) => ctrl.createSection(req, res, next) );

  route.put('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        duration: Joi.number().required(),
        distance: Joi.number().required(),
        energySpent: Joi.number().required(),
        extraTime: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.updateSection(req, res, next) );

    route.get('',
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.getAllSections(req, res, next));

    route.get('/:id',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        id:Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getSection(req, res, next));

    route.delete('',
    celebrate({
      body: Joi.object({
        id:Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.deleteById(req, res, next));
};

