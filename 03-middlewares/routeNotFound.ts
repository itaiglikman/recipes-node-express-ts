import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../01-utils/client-errors";

function routeNotFound(request: Request, response: Response, next: NextFunction) {

    // Handles 404 - route not found
    console.error('Error: route not found');
    throw new RouteNotFoundError(request.originalUrl)
    // response.status(404).send('Not found ' + request.originalUrl);
}

export default routeNotFound;
