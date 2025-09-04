import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../01-utils/client-errors";

export function verifyToken(request: Request, response: Response, next: NextFunction) {
    const token = request.header('authorization')?.replace('Bearer ', '');
    if (!token)
        throw new UnauthorizedError("You're not authorized!");
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        console.log(err);
        if (err === "jwt missing" || err.name === "TokenExpiredError")
            throw new UnauthorizedError("You're not authorized!");
        throw new UnauthorizedError(err.message);
    }
}