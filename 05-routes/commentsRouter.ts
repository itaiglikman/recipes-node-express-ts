import express from "express";
import validateRecipeId from "../03-middlewares/validateId";
import { verifyToken } from "../03-middlewares/verifyToken";
import { addComment } from "../04-controllers/commentsController";

const router = express.Router();

// get post's comment:
router.get('/',
    verifyToken,
    validateRecipeId, 
    addComment
);


export default router;