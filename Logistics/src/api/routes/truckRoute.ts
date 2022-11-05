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
        autonomy: Joi.string().required(),
        maxBattery: Joi.string().required(),
        payLoad: Joi.string().required(),
        tare: Joi.string().required(),
        baterryChargingTime: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        plate:Joi.string().required(),
        name: Joi.string().required(),
        autonomy: Joi.string().required(),
        maxBattery: Joi.string().required(),
        payLoad: Joi.string().required(),
        tare: Joi.string().required(),
        baterryChargingTime: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );

   

    route.get('',
    celebrate({
      params: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getAllTrucks(req, res, next));
};

