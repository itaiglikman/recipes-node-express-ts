import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";
import { CommentBody } from "../01-utils/types";
import commentsModel from "../02-models/commentsModel";
import errorsHandling from "../01-utils/errorsHandling";

export async function addComment(request: Request, response: Response, next: NextFunction) {
    try {
        const commentData = {
            recipeId: request.params.id,
            userId: request.user.id,
            username: request.user.username,
            ...request.body
        } as CommentBody;
        const newComment = await commentsModel.addComment(commentData);
        response.status(StatusCode.Created).json(newComment);
    } catch (error) {
        if (error.name === 'ValidationError')
            errorsHandling.handleSchemaErrors(error);
        next(error)
    }
}
