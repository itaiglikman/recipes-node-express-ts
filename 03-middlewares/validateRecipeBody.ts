import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import recipeUtils from "../01-utils/recipeUtils";

function validateRecipeBody(request: Request, response: Response, next: NextFunction) {
    try {
        console.log('validateRecipeBody body', request.body);
        const errors = validationResult(request);
        if (!errors.isEmpty())
            recipeUtils.handleRecipeValidationError(errors);
        next();
    } catch (error) {
        next(error);
    }
}

export default validateRecipeBody;