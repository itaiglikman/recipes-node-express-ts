import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";
import recipesModel from "../02-models/recipesModel";

export function getRecipes(request: Request, response: Response, next: NextFunction) {
    const existingQueries = Object.keys(request.query).length;
    const recipes = existingQueries
        ? recipesModel.getRecipesByQuery(request)
        : recipesModel.getRecipes();
    response.status(StatusCode.OK).json(recipes);
}

export function getRecipeById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const recipe = recipesModel.getRecipeById(id);
    response.status(StatusCode.OK).json(recipe);
}

export function addRecipe(request: Request, response: Response, next: NextFunction) {
    recipesModel.validateRecipeBody(request); //validate req.body
    recipesModel.addRecipe(request.body);
    response.status(StatusCode.Created).json({ message: 'New recipe created' });
}

export function deleteRecipeById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    recipesModel.deleteRecipeById(id);
    response.sendStatus(StatusCode.NoContent)
}