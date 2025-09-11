import { QueryTypes } from "sequelize";
import { CustomError, ValidationError } from "../01-utils/client-errors";
import StatusCode from "../01-utils/status-code";
import appConfig from "../appConfig";
const sequelize = appConfig.sequelize;

async function getAllFavorites(userId?: string) {
    const query = `
    SELECT r.id,r.title
    FROM recipes r
    JOIN user_favorites uf ON uf.recipeId = r.id
    WHERE r.userId = :userId
    `
    const [result] = await sequelize.query(query, { replacements: { userId } })
    const allFavs = result
    return allFavs;
}

async function addFavorite(recipeId: string, userId: string) {
    try {
        const query = `INSERT INTO user_favorites (userId,recipeId) VALUES (:userId,:recipeId)`;
        await sequelize.query(query, { replacements: { userId, recipeId } });
    } catch (error: any) {
        console.error('Database error in addFavorite:', error);

        // Handle duplicate entry (unique constraint violation)
        if (error.name === 'SequelizeUniqueConstraintError' ||
            (error.errors && error.errors[0]?.validatorKey)) {
            throw new ValidationError('User already has the current favorite recipe.');
        }

        // Handle other database errors
        if (error.name && error.name.startsWith('Sequelize')) {
            throw new ValidationError('Database error occurred while adding favorite.');
        }

        throw error;
    }
}

async function deleteFavorite(recipeId: string, userId: string) {
    const query = `DELETE FROM user_favorites WHERE userId = :userId AND recipeId = :recipeId`;
    const result = await sequelize.query(query,
        {
            replacements: { userId, recipeId },
            type: QueryTypes.DELETE
        });
    if (result[1]?.affectedRows === 0)
        throw new CustomError(StatusCode.BadRequest, 'Wanted Favorite recipe was not found')
}

export default {
    getAllFavorites, addFavorite, deleteFavorite
}