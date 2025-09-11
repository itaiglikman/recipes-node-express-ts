import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";
import favoritesModel from "../02-models/favoritesModel";

// get all favorites from table without constraints
export async function getAllFavorites(request: Request, response: Response, next: NextFunction) {
    const allFavs = await favoritesModel.getAllFavorites(request.user.id);
    response.status(StatusCode.OK).json(allFavs);
}

export async function addFavorite(request: Request, response: Response, next: NextFunction) {
    const recipeId = request.params.id;
    const userid = request.user.id;
    await favoritesModel.addFavorite(recipeId, userid);
    response.status(StatusCode.Created).send('added to favorites');
}

export async function deleteFavorite(request: Request, response: Response, next: NextFunction) {
    const recipeId = request.params.id;
    const userId = request.user.id;
    await favoritesModel.deleteFavorite(recipeId, userId);
    response.sendStatus(StatusCode.NoContent);
}
