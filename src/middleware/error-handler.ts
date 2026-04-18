import type { Request, Response, NextFunction } from 'express'
import { isAppError, HttpStatus } from '../shared/types/errors.js'
import { env } from '../config/env.js'

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Check if operation error thrown on purpose
  if (isAppError(err)) {
    const statusCode = err.statusCode

    if (statusCode >= 500) {
      console.error(`[AppError] ${statusCode}: ${err.message}`)
    }

    res.status(statusCode).render('errors/error', {
      title: getTitleForStatus(statusCode),
      metaDescription: 'Došlo k chybě.',
      statusCode,
      message: statusCode < 500 ? err.message : 'Došlo k neočekávané chybě.',
      stack: env.NODE_ENV === 'development' ? err.stack : null, // Only show stack trace in development
    })
    return
  }

  // Unexpected error, no details for user
  console.error('[UnexpectedError]', err)

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).render('errors/error', {
    title: 'Chyba serveru',
    metaDescription: 'Došlo k neočekávané chybě.',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Došlo k neočekávané chybě. Zkuste to prosím znovu.',
    stack: env.NODE_ENV === 'development' && err instanceof Error ? err.stack : null,
  })
}

// Status helper
const getTitleForStatus = (statusCode: number): string => {
  const titles: Record<number, string> = {
    400: 'Neplatný požadavek',
    401: 'Přístup odepřen',
    403: 'Zakázáno',
    404: 'Stránka nenalezena',
    422: 'Neplatná data',
    429: 'Příliš mnoho požadavků',
    500: 'Chyba serveru',
    502: 'Chyba brány',
  }
  return titles[statusCode] ?? 'Chyba'
}
