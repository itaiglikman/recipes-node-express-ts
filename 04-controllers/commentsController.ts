import { NextFunction, Request, Response } from "express";
import errorsHandling from "../01-utils/errorsHandling";
import StatusCode from "../01-utils/status-code";
import { NewCommentBody, UpdateCommentBody } from "../01-utils/types";
import commentsModel from "../02-models/commentsModel";
import { ICommentModel } from "../06-schemas/commentSchema";

/*
req.body: {content:string, rating:number}
*/
export async function addComment(request: Request, response: Response, next: NextFunction) {
    try {
        const commentData = {
            recipeId: request.params.id,
            userId: request.user.id,
            username: request.user.username,
            ...request.body
        } as NewCommentBody;
        const newComment = await commentsModel.addComment(commentData);
        response.status(StatusCode.Created).json(newComment);
    } catch (error) {
        if (error.name === 'ValidationError')
            errorsHandling.handleSchemaErrors(error);
        next(error);
    }
}

/*
recipeId - req.params.id
*/
export async function getRecipeComments(request: Request, response: Response, next: NextFunction) {
    try {
        const recipeId = request.params.id;
        const comments = await commentsModel.getCommentsByRecipeId(recipeId);
        response.status(StatusCode.Created).json(comments);
    } catch (error) {
        next(error);
    }

}

// params: commentId
export async function getCommentById(request: Request, response: Response, next: NextFunction) {
    try {
        const commentId = request.params.commentId;
        const comment = await commentsModel.getCommentById(commentId);
        response.status(StatusCode.Created).json(comment);
    } catch (error) {
        next(error);
    }

}

/*
req.body: {content:string, rating:number}
req.params.commentId
*/
export async function updateComment(request: Request, response: Response, next: NextFunction) {
    try {
        console.log('update controllers')
        const commentId = request.params.commentId;
        const newComment = await commentsModel.updateComment(commentId,request.body as UpdateCommentBody);
        response.status(StatusCode.OK).json(newComment);
    } catch (error) {
        if (error.name === 'ValidationError')
            errorsHandling.handleSchemaErrors(error);
        next(error);
    }
}
