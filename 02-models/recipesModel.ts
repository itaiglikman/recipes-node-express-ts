import { Request } from "express";
import { validationResult } from "express-validator";
import { nanoid } from "nanoid";
import recipeStats from "../01-utils/recipeStats";
import recipeUtils from "../01-utils/recipeUtils";
import { BodyRecipe, Recipe } from "../01-utils/types";
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

function updateFullRecipe(id: string, recipeUpdatedBody: BodyRecipe): Recipe {
    const originalRecipeIndex = recipes.findIndex(r => r.id === id);
    const originalRecipe = recipes[originalRecipeIndex];
    const updateFullRecipe: Recipe = { ...recipeUpdatedBody, id, createdAt: originalRecipe.createdAt };
    recipes[originalRecipeIndex] = updateFullRecipe;
    return updateFullRecipe;
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

function getStats(): { totalCount: number, avgCookingTime: number, recipesByDifficulty: Recipe[] } {
    const totalCount = recipeStats.totalCount(recipes);
    const avgCookingTime = recipeStats.cookingTimeAVG(recipes);
    const recipesByDifficulty = recipeStats.recipesByDifficulty(recipes);
    const statsObj = { totalCount, avgCookingTime, recipesByDifficulty };
    return statsObj;
}

export default {
    getRecipes, getRecipeById, addRecipe, deleteRecipeById, validateRecipeBody, getRecipesByQuery, updateFullRecipe, getStats
}

