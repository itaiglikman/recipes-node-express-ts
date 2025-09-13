import express from "express";
import validateCommentId from "../03-middlewares/validateCommentId";
import { validateResourceOwnership } from "../03-middlewares/validateResourceOwnership";
import { verifyToken } from "../03-middlewares/verifyToken";
import { getCommentById, toggleLike, updateComment } from "../04-controllers/commentsController";

const router = express.Router();

// update comment
router.put('/:commentId',
    verifyToken,
    validateCommentId, /*validate body,*/
    // validateResourceOwnership,
    updateComment
)

// toggle like
router.put('/:commentId/like',
    verifyToken,
    validateCommentId, /*validate body,*/
    // validateResourceOwnership,
    toggleLike
)

// get comment by id
router.get('/:commentId',
    getCommentById
)

export default router;