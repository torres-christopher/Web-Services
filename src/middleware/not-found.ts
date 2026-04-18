import type { Request, Response, NextFunction } from 'express'
import { AppError, HttpStatus } from '../shared/types/errors.js'

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError('Stránka nenalezena', HttpStatus.NOT_FOUND))
}
