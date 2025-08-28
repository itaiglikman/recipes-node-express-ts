import { nanoid } from "nanoid";
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

function deleteRecipeById(id: string): void {
    recipes = recipes.filter(r => r.id !== id);
}


export default {
    getRecipes, getRecipeById, addRecipe, deleteRecipeById
}

