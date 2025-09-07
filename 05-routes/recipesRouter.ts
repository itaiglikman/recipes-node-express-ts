import express from "express";
import recipeValidationSchema from "../01-utils/validation-schemas/recipeValidationSchema";
import validateId from "../03-middlewares/validateId";
import { validateUpload } from "../01-utils/handleImages";
import { validateRecipeOwnership } from "../03-middlewares/validateMatchingUser";
import validateRecipeBody from "../03-middlewares/validateRecipeBody";
import { verifyToken } from "../03-middlewares/verifyToken";
import { addRecipe, deleteRecipeById, getLoggedUserRecipes, getRecipeById, getRecipes, updateFullRecipe } from '../04-controllers/recipesController';

const router = express.Router();

// GET
router.get('/', verifyToken, getRecipes);
// router.get('/stats', getStats);
router.get('/my-recipes', verifyToken, getLoggedUserRecipes)
router.get('/:id', validateId, getRecipeById);

// POST
router.post('/',
    verifyToken, //auth
    validateUpload.single('imageFile'), // file upload and validation
    recipeValidationSchema, validateRecipeBody, validateRecipeOwnership, // body validation
    addRecipe // action
);

// PUT
router.put('/:id',
    verifyToken, validateId, //auth
    validateUpload.single('imageFile'), // file upload and validation
    recipeValidationSchema, validateRecipeBody, validateRecipeOwnership, // body validation
    updateFullRecipe // action
);

// DELETE
router.delete('/:id', verifyToken, validateId, deleteRecipeById);

export default router;