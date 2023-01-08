import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPlanningController from '../../controllers/IControllers/IPlanningController'; 
import middlewares from '../middlewares';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/plannings', route);
  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

    route.get('/bestRoute',middlewares.isAuth,
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getBestRoute(req, res, next));

    route.get('/routeHeuristicTime',middlewares.isAuth,
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getRouteHeuristicTime(req, res, next));

    route.get('/routeHeuristicMass',middlewares.isAuth,
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getRouteHeuristicMass(req, res, next));

    route.get('/routeHeuristicTimeAndMass',middlewares.isAuth,
    celebrate({
      query: Joi.object().keys({
        truckName:Joi.string(),
        deliveryDate:Joi.string()
      })
    }),
    (req, res, next) => ctrl.getRouteHeuristicTimeAndMass(req, res, next));
    
    route.get('/geneticAlg',middlewares.isAuth,
    celebrate({
      query: Joi.object().keys({
        deliveryDate:Joi.string(),
        numGer:Joi.number(),
        dimPop:Joi.number(),
        perC:Joi.number(),
        perM:Joi.number(),
        refVal:Joi.number(),
      })
    }),
    (req, res, next) => ctrl.getGenetic(req, res, next));~

    route.get('/planning',middlewares.isAuth,
    celebrate({
      query: Joi.object().keys({
  
      })
    }),
    (req, res, next) => ctrl.getPlanning(req, res, next));
};