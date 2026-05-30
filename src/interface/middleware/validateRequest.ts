import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export function validateRequest(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Keep validated values
      req.body = parsed.body;
      if (parsed.query) {
        for (const key in req.query) {
          delete req.query[key];
        }
        Object.assign(req.query, parsed.query);
      }
      if (parsed.params) {
        for (const key in req.params) {
          delete req.params[key];
        }
        Object.assign(req.params, parsed.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Error de validación de datos',
          errors: error.errors.map((err) => ({
            field: err.path.slice(1).join('.'), // e.g. body.email -> email
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
}
