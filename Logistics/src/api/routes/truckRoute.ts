import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        plate:Joi.string().required(),
        name: Joi.string().required(),
        autonomy: Joi.number().required(),
        maxBattery: Joi.number().required(),
        payLoad: Joi.number().required(),
        tare: Joi.number().required(),
        baterryChargingTime: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

  route.patch('',
    celebrate({
      body: Joi.object({
        plate:Joi.string().required(),
        name: Joi.string(),
        autonomy: Joi.number(),
        maxBattery: Joi.number(),
        payLoad: Joi.number(),
        tare: Joi.number(),
        baterryChargingTime: Joi.number(),
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );

   

    route.get('',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getAllTrucks(req, res, next));

    route.get('/:plate',
    celebrate({
      body: Joi.object({
        plate:Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getTruck(req, res, next));
};

