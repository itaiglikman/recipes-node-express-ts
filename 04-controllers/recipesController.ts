import { Request, Response, NextFunction } from "express";
import recipesModel from "../02-models/recipesModel";
import StatusCode from "../01-utils/status-code";

function getRecipes(request: Request, response: Response, next: NextFunction) {
    const recipes = recipesModel.getRecipes();
    response.status(StatusCode.OK).json(recipes);
}

function getRecipeById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const recipe = recipesModel.getRecipeById(id);
    response.status(StatusCode.OK).json(recipe);
}

function addRecipe(request: Request, response: Response, next: NextFunction) {
    const newRecipe = recipesModel.addRecipe(request.body);
    response.status(StatusCode.OK).json(newRecipe);
}
function deleteRecipeById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    recipesModel.deleteRecipeById(id);
    response.status(StatusCode.OK).json({message:'ok'})
}

export default {
    getRecipes, getRecipeById, addRecipe, deleteRecipeById
}