import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../01-utils/client-errors";

/**
 * Ensures users can only modify resources they own by comparing JWT user ID with request body userId.
 * Prevents unauthorized access to other users' recipes, comments, and favorites.
 */
export function validateResourceOwnership(request: Request, response: Response, next: NextFunction) {
    const authenticatedUserId = request.user.id;
    const requestedUserId = request.body.userId;
    if (authenticatedUserId !== requestedUserId) {
        console.log('validateMatchingUser error');
        throw new UnauthorizedError("You can only access your own resources.");
    }
    next();
}