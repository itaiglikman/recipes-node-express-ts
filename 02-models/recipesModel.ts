import { nanoid } from "nanoid";
import { BodyRecipe, Recipe } from "../01-utils/types";
import { Request } from "express";
import { validationResult } from "express-validator";
import { RouteNotFoundError, ValidationError } from "../01-utils/client-errors";
import recipeUtils from "../01-utils/recipeUtils";
const recipesData = require("../data/recipes.json");

let recipes: Recipe[] = recipesData;

function getRecipes() {
    return recipes;
}

function getRecipeById(id: string): Recipe {
    const recipe = recipes.find(r => r.id === id);
    return recipe;
}

function addRecipe(body: BodyRecipe): Recipe {
    const recipe: Recipe = { ...body, id: nanoid(5), createdAt: new Date().toISOString() };
    recipes.push(recipe);
    return recipe;
}

function deleteRecipeById(id: string): void {
    recipes = recipes.filter(r => r.id !== id);
}

function validateRecipeBody(request: Request) {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        recipeUtils.handleRecipeValidationError(errors);
}

function getRecipesByQuery(request: Request): Recipe[] {
    const filteredRecipes = recipeUtils.filterByQuery(request, getRecipes());
    return filteredRecipes ? filteredRecipes : [];
}


export default {
    getRecipes, getRecipeById, addRecipe, deleteRecipeById, validateRecipeBody, getRecipesByQuery
}

