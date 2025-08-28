import { NextFunction, Request, Response } from "express";
import { ResourceNotFoundError } from "../01-utils/client-errors";

// log request time and method
function validateId(request: Request, response: Response, next: NextFunction): void {

    const id = +request.params.id;
    if (isNaN(id)) {
        console.log('validateId error');
        throw new ResourceNotFoundError(id)
    }
    next();
}

export default validateId;