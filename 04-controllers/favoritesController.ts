import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";
import favoritesModel from "../02-models/favoritesModel";

export async function getFavorites(request: Request, response: Response, next: NextFunction) {
    response.send('favorites')
}

export async function addFavorite(request: Request, response: Response, next: NextFunction) {
    const recipeId = request.params.id;
    const userid = request.user.id;
    const result = favoritesModel.addFavorite(recipeId, userid);
    response.status(StatusCode.OK).send(result);
}
