import express from "express";
import validateRecipeId from "../03-middlewares/validateId";
import { validateRecipeOwnership } from "../03-middlewares/validateRecipeOwnership";
import { verifyToken } from "../03-middlewares/verifyToken";
import { addFavorite, getFavorites } from "../04-controllers/favoritesController";

const router = express.Router();

// GET
router.get('/', getFavorites);

// POST
// add favorite recipe to user
router.post('/:id', verifyToken, validateRecipeId, addFavorite);

// DELETE

export default router;