import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
  getAllRoutes(req: Request, res: Response, next: NextFunction);
}