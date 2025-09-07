import { Request } from "express";
import { v4 as uuid } from 'uuid';
import recipeStats from "../01-utils/recipeStats";
import recipeUtils from "../01-utils/recipeUtils";
import { BodyRecipe, Recipe } from "../01-utils/types";
import appConfig from "../appConfig";
import { ResourceNotFoundError } from "../01-utils/client-errors";
const recipesData = require("../data/recipes.json");
const sequelize = appConfig.sequelize;
let recipes: Recipe[] = recipesData;

async function getRecipes(): Promise<Recipe[]> {
    const query = `SELECT * FROM recipes`
    const [result] = await sequelize.query(query);
    const recipes = result as Recipe[];
    return recipes;
}

async function getRecipeById(id: string): Promise<Recipe> {
    const query = `SELECT * FROM recipes WHERE id=?`
    const [result] = await sequelize.query(query, { replacements: [id] })
    const recipe = result[0] as Recipe;
    return recipe;
}

async function getUserRecipes(userId: string): Promise<Recipe[]> {
    const query = `SELECT * FROM recipes WHERE userId=?;`
    const [result] = await sequelize.query(query, { replacements: [userId] });
    console.log('getUserRecipes:', result);
    const recipes = result as Recipe[];
    return recipes;
}

async function addRecipe(body: BodyRecipe): Promise<Recipe> {
    const id = uuid(); // Generate UUID in application
    const query = `
        INSERT INTO recipes 
        (id,userId,title,description,ingredients,instructions,cookingTime,servings,difficulty,isPublic,rating) 
        VALUES (:id,:userId,:title,:description,:ingredients,:instructions,:cookingTime,:servings,:difficulty,:isPublic,:rating)`;

    const values = { id, ...body };
    await sequelize.query(query, { replacements: values })
    const recipe: Recipe = values;
    return recipe;
}

async function updateFullRecipe(id: string, recipeUpdatedBody: BodyRecipe): Promise<Recipe> {
    const query = `
        UPDATE recipes 
        SET userId = :userId, title = :title,
            description = :description, ingredients = :ingredients,
            instructions = :instructions, cookingTime = :cookingTime,
            servings = :servings, difficulty = :difficulty,
            isPublic = :isPublic, rating = :rating
        WHERE id = :id`;
    const values = { id, ...recipeUpdatedBody };

    await sequelize.query(query, { replacements: values })
    const updateFullRecipe: Recipe = values;
    return updateFullRecipe;
}

// delete by recipe id and authenticated user id
async function deleteRecipeById(id: string, userId: string): Promise<void> {
    const query = `DELETE FROM recipes WHERE id = :id AND userId = :userId;`;

    const [result]: any = await sequelize.query(query, { replacements: { id, userId } });
    if (result.affectedRows === 0) // notify on unsuccessful delete
        throw new ResourceNotFoundError(id);
}

async function getRecipesByQuery(request: Request): Promise<Recipe[]> {
    const recipes = await getRecipes()
    const filteredRecipes = recipeUtils.filterByQuery(request, recipes);
    return filteredRecipes ? filteredRecipes : [];
}

async function getStats(): Promise<{ totalCount: number, avgCookingTime: number, recipesByDifficulty: Recipe[] }> {
    const totalCount = recipeStats.totalCount(recipes);
    const avgCookingTime = recipeStats.cookingTimeAVG(recipes);
    const recipesByDifficulty = recipeStats.recipesByDifficulty(recipes);
    const statsObj = { totalCount, avgCookingTime, recipesByDifficulty };
    return statsObj;
}

export default {
    getRecipes, getRecipeById, addRecipe, deleteRecipeById,
    getRecipesByQuery, updateFullRecipe, getStats, getUserRecipes,
}

