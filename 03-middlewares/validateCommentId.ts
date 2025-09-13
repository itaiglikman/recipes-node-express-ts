    import { NextFunction, Request, Response } from "express";
import { ResourceNotFoundError, ValidationError } from "../01-utils/client-errors";
import commentsModel from "../02-models/commentsModel";

    // log request time and method
    async function validateCommentId(request: Request, response: Response, next: NextFunction): Promise<void> {

        const id = request.params.commentId;
        // id not send in url
        if (!id) {
            console.log('validateId middleware: no comment id param');
            throw new ValidationError('No id was sent');
        }

        // no comment with this id
        if (!await commentsModel.getCommentById(id)) {
            console.log('validateId middleware: no comment was found');
            throw new ResourceNotFoundError(id);
        }

        next();
    }

    export default validateCommentId;