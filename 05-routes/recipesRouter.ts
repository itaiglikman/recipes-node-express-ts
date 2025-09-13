import express from "express";
import recipeValidationSchema from "../01-utils/validation-schemas/recipeValidationSchema";
import validateRecipeId from "../03-middlewares/validateRecipeId";
import { validateUpload } from "../01-utils/handleImages";
import { validateResourceOwnership } from "../03-middlewares/validateResourceOwnership";
import validateRecipeBody from "../03-middlewares/validateRecipeBody";
import { verifyToken } from "../03-middlewares/verifyToken";
import { addRecipe, deleteRecipeById, getLoggedUserRecipes, getRecipeById, getRecipes, updateFullRecipe } from '../04-controllers/recipesController';
import { addComment, getRecipeComments } from "../04-controllers/commentsController";

const router = express.Router();

// add new comment:
router.post('/:id/comments',
    verifyToken,
    validateRecipeId, /*validate body,*/
    addComment
);

// get post's comment:
router.get('/:id/comments',
    verifyToken,
    validateRecipeId, 
    getRecipeComments
);

// GET
router.get('/', verifyToken, getRecipes);
// router.get('/stats', getStats);
router.get('/my-recipes', verifyToken, getLoggedUserRecipes)
router.get('/:id', validateRecipeId, getRecipeById);

// POST
router.post('/',
    verifyToken, //auth
    validateUpload.single('imageFile'), // file upload and validation
    recipeValidationSchema, validateRecipeBody, validateResourceOwnership, // body validation
    addRecipe // action
);

// PUT
router.put('/:id',
    verifyToken, validateRecipeId, //auth
    validateUpload.single('imageFile'), // file upload and validation
    recipeValidationSchema, validateRecipeBody, validateResourceOwnership, // body validation
    updateFullRecipe // action
);

// DELETE
router.delete('/:id', verifyToken, validateRecipeId, deleteRecipeById);

export default router;