import express from "express";
import { getRecipes, getRecipeById, addRecipe, deleteRecipeById } from '../04-controllers/recipesController';
// import recipesController from '../04-controllers/recipesController';
import validateId from "../03-middlewares/validateId";
import recipeValidationSchema from "../03-middlewares/recipeValidationSchema";

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', validateId, getRecipeById);
router.post('/', recipeValidationSchema, addRecipe);
router.delete('/:id', validateId, deleteRecipeById);

export default router;