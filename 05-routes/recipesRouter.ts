import express from "express";
import { getRecipes, getRecipeById, addRecipe, deleteRecipeById, updateFullRecipe, getStats } from '../04-controllers/recipesController';
import validateId from "../03-middlewares/validateId";
import recipeValidationSchema from "../03-middlewares/recipeValidationSchema";

const router = express.Router();

// GET
router.get('/', getRecipes);
router.get('/stats', getStats);
router.get('/:id', validateId, getRecipeById);

// POST
router.post('/', recipeValidationSchema, addRecipe);

// PUT
router.put('/:id', validateId, recipeValidationSchema, updateFullRecipe);

// DELETE
router.delete('/:id', validateId, deleteRecipeById);

export default router;