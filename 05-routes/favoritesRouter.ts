import express from "express";
import validateRecipeId from "../03-middlewares/validateRecipeId";
import { verifyToken } from "../03-middlewares/verifyToken";
import { addFavorite, deleteFavorite, getAllFavorites } from "../04-controllers/favoritesController";

const router = express.Router();

// GET
router.get('/', verifyToken, getAllFavorites);

// POST
router.post('/:id', verifyToken, validateRecipeId, addFavorite);

// DELETE
router.delete('/:id', verifyToken, validateRecipeId, deleteFavorite);

export default router;