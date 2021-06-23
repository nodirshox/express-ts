import { Request, Response, NextFunction } from 'express';

export default (executable: any) => (req: Request, res: Response, next: NextFunction) => {
  executable(req, res, next).catch(next);
}