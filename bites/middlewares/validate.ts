import type { NextFunction, Response, Request } from "express";
import type { ZodSchema } from "zod";


// To validate the request body using zodSchemas (which we have creted)
export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors,
      });
    }
    next();
  };
