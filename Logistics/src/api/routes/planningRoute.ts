import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPlanningController from '../../controllers/IControllers/IPlanningController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/plannings', route);
  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

    route.get('/bestRoute',
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getBestRoute(req, res, next));

    route.get('/routeHeuristicTime',
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getRouteHeuristicTime(req, res, next));

    route.get('/routeHeuristicMass',
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getRouteHeuristicMass(req, res, next));

    route.get('/routeHeuristicTimeAndMass',
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getRouteHeuristicTimeAndMass(req, res, next));
};