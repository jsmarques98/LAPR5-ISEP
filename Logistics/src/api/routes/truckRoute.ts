import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        domainId:Joi.string(),
        plate:Joi.string().required(),
        name: Joi.string().required(),
        autonomy: Joi.number().required(),
        maxBattery: Joi.number().required(),
        payLoad: Joi.number().required(),
        tare: Joi.number().required(),
        baterryChargingTime: Joi.number().required(),
        active: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

  route.patch('',middlewares.isAuth,
  
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

   

    route.get('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getAllTrucks(req, res, next));

    route.get('/:plate',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        plate:Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getTruck(req, res, next));

    route.delete('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        Plate:Joi.string().required()
      })
    }),

    

    (req, res, next) => ctrl.deleteByPlatepublic(req, res, next));




    route.delete('/:soft',
    celebrate({
      body: Joi.object({
        Plate:Joi.string().required()
      })
    }),

    (req, res, next) => ctrl.inativeTruck(req, res, next));

    route.patch('/:plate',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        active: Joi.string().required(),
      })
    }),

    (req, res, next) => ctrl.activateTruck(req, res, next));
};


