import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  getTruck(req: Request, res: Response, next: NextFunction);
  getAllTrucks(req: Request, res: Response, next: NextFunction);
  deleteByPlatepublic(req: Request, res: Response, next: NextFunction);
  inativeTruck(req: Request, res: Response, next: NextFunction);
  activateTruck(req: Request, res: Response, next: NextFunction);
}