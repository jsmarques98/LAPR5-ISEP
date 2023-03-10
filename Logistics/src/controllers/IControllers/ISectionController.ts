import { Request, Response, NextFunction } from 'express';

export default interface ISectionController  {
  createSection(req: Request, res: Response, next: NextFunction);
  updateSection(req: Request, res: Response, next: NextFunction);
  getAllSections(req: Request, res: Response, next: NextFunction);
  getSections(req: Request, res: Response, next: NextFunction);
  getSection(req: Request, res: Response, next: NextFunction);
  deleteById(req: Request, res: Response, next: NextFunction);
}