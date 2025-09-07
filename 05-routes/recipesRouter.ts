import express from "express";
import { getRecipes, getRecipeById, addRecipe, deleteRecipeById, updateFullRecipe, getStats, getLoggedUserRecipes } from '../04-controllers/recipesController';
import validateId from "../03-middlewares/validateId";
import recipeValidationSchema from "../01-utils/validation-schemas/recipeValidationSchema";
import { verifyToken } from "../03-middlewares/verifyToken";
import validateRecipeBody from "../03-middlewares/validateRecipeBody";
import { validateRecipeOwnership } from "../03-middlewares/validateMatchingUser";

const router = express.Router();

// GET
router.get('/', verifyToken, getRecipes);
// router.get('/stats', getStats);
router.get('/my-recipes', verifyToken, getLoggedUserRecipes)
router.get('/:id', validateId, getRecipeById);

// POST
router.post('/',
    verifyToken, //auth
    recipeValidationSchema, validateRecipeBody, validateRecipeOwnership, // body validation
    addRecipe // action
);

// PUT
router.put('/:id',
    verifyToken, validateId, //auth
    recipeValidationSchema, validateRecipeBody, validateRecipeOwnership, // body validation
    updateFullRecipe // action
);

// DELETE
router.delete('/:id', verifyToken, validateId, deleteRecipeById);

export default router;