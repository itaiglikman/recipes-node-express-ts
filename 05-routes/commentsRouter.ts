import express from "express";
import validateCommentId from "../03-middlewares/validateCommentId";
import { validateResourceOwnership } from "../03-middlewares/validateResourceOwnership";
import { verifyToken } from "../03-middlewares/verifyToken";
import { getCommentById, updateComment } from "../04-controllers/commentsController";

const router = express.Router();

router.put('/:commentId',
    verifyToken,
    validateCommentId, /*validate body,*/
    // validateResourceOwnership,
    updateComment
)

router.get('/:commentId',
    getCommentById
)

export default router;