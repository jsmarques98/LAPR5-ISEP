import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
  getBestRoute(req: Request, res: Response, next: NextFunction);
  getRouteHeuristicTime(req: Request, res: Response, next: NextFunction);
  getRouteHeuristicMass(req: Request, res: Response, next: NextFunction);
  getRouteHeuristicTimeAndMass(req: Request, res: Response, next: NextFunction);
}