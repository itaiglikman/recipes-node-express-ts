import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../01-utils/client-errors";

// match the logged user from the token to the user in the body, send from the client.
// user can't access recipes not owned by the same user.
// can add later admin approval.
export function validateRecipeOwnership(request: Request, response: Response, next: NextFunction) {
    const authenticatedUserId = request.user.id;
    const requestedUserId = request.body.userId;
    if (authenticatedUserId !== requestedUserId) {
        console.log('validateMatchingUser error');
        throw new UnauthorizedError("You can only access recipes of your own.");
    }
    next();
}