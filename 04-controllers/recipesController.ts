import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";
import recipesModel from "../02-models/recipesModel";

export async function getRecipes(request: Request, response: Response, next: NextFunction) {
    // const existingQueries = Object.keys(request.query).length;
    // const recipes = existingQueries
    //     ? recipesModel.getRecipesByQuery(request)
    //     : await recipesModel.getRecipes();
    const recipes = await recipesModel.getRecipes();
    response.status(StatusCode.OK).json(recipes);
}

export async function getRecipeById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const recipe = await recipesModel.getRecipeById(id);
    response.status(StatusCode.OK).json(recipe);
}

export async function getLoggedUserRecipes(request: Request, response: Response, next: NextFunction) {
    const userId = request.user.id;
    const recipes = await recipesModel.getUserRecipes(userId);
    response.status(StatusCode.OK).json(recipes);
}

// check if the validation has new attr
export async function addRecipe(request: Request, response: Response, next: NextFunction) {
    const imagePath = request?.file.path;
    request.body.imageURL = imagePath;
    const recipe = await recipesModel.addRecipe(request.body);
    response.status(StatusCode.Created).json(recipe);
}

export async function updateFullRecipe(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const imagePath = request?.file.path;
    request.body.imageURL = imagePath;
    const updatedRecipe = await recipesModel.updateFullRecipe(id, request.body);
    response.status(StatusCode.OK).json(updatedRecipe);
}

export async function deleteRecipeById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const userId = request.user.id;
    await recipesModel.deleteRecipeById(id, userId);
    response.status(StatusCode.NoContent).json({ message: 'Deleted successfully' })
}

export async function getStats(request: Request, response: Response, next: NextFunction) {
    const stats = recipesModel.getStats();
    response.status(StatusCode.OK).json(stats);
}
