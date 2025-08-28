import express from "express";
import recipesController from '../04-controllers/recipesController';

const router = express.Router();

router.get('/', recipesController.getRecipes);
router.get('/:id', recipesController.getRecipeById);
router.post('/', recipesController.addRecipe);
router.delete('/:id', recipesController.deleteRecipeById);

export default router;