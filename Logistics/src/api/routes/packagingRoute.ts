import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPackagingController from '../../controllers/IControllers/IPackagingController'; 
import middlewares from '../middlewares';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/packagings', route);
  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;

  route.post('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        positionX: Joi.number().required(),
        positionY: Joi.number().required(),
        positionZ: Joi.number().required(),
        truckPlate: Joi.string().required(),
        deliveryId: Joi.string().required(),

      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next) );

  route.put('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        positionX: Joi.number().required(),
        positionZ: Joi.number().required(),
        positionY: Joi.number().required(),
        truckId: Joi.string().required(),
        deliveryId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next) );

    route.get('',middlewares.isAuth,
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.getAllPackaging(req, res, next));
};

