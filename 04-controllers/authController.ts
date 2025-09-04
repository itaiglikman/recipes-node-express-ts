import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";
import authModel from "../02-models/authModel";


export async function register(request: Request, response: Response, next: NextFunction) {
    const token = await authModel.registerUser(request.body);
    response.status(StatusCode.Created).json(token);
}

export async function login(request: Request, response: Response, next: NextFunction) {
    const token = await authModel.login(request.body);
    response.status(StatusCode.OK).json(token);
}

export async function getProfile(request: Request, response: Response, next: NextFunction) {

    response.status(StatusCode.OK).send('valid token');
}