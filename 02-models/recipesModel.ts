import { nanoid } from "nanoid";
import { BodyRecipe, Recipe } from "../01-utils/types";
import { Request } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../01-utils/client-errors";
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
    if (!errors.isEmpty()) {
        const msgSet = new Set();
        const errObj = errors.mapped(); // get an object of each prop errors
        for (const prop in errObj) { // get first error of each prop
            msgSet.add(errObj[prop].msg);
        }
        const msg = [...msgSet].join(', ');
        console.log('validate recipe errors: ', msgSet);
        throw new ValidationError(msg);
    }
}


export default {
    getRecipes, getRecipeById, addRecipe, deleteRecipeById, validateRecipeBody
}

