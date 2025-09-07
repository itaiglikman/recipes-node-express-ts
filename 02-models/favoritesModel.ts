import { Request } from "express";
import { v4 as uuid } from 'uuid';
import appConfig from "../appConfig";
const sequelize = appConfig.sequelize;

async function addFavorite(recipeId: string, userId: string) {
    const query = `INSERT INTO user_favorites (userId,recipeId) VALUES (:userId,:recipeId)`;
    const result = await sequelize.query(query, { replacements: { userId, recipeId } });
    console.log(result);
    return true;
}

export default {
    addFavorite,
}

