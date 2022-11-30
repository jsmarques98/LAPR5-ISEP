import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPlanningController from '../../controllers/IControllers/IPlanningController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  console.log("sdfdsd------------")
  app.use('/plannings', route);
  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

    route.get('/:ola',
    celebrate({
      query: Joi.object().keys({
        truckPlate:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getAllRoutes(req, res, next));
};

