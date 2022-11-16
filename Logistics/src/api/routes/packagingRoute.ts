import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPackagingController from '../../controllers/IControllers/IPackagingController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  console.log("sdfdsd------------")
  app.use('/packagings', route);
  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;

  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        positionX: Joi.string().required(),
        positionY: Joi.string().required(),
        positionZ: Joi.string().required(),
        truckId: Joi.string().required(),
        deliveryId: Joi.string().required(),

      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        positionX: Joi.string().required(),
        positionY: Joi.string().required(),
        positionZ: Joi.string().required(),
        truckId: Joi.string().required(),
        deliveryId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next) );

    route.get('',
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.getAllPackaging(req, res, next));
};

