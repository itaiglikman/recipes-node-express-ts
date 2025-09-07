    import { NextFunction, Request, Response } from "express";
    import { ResourceNotFoundError, ValidationError } from "../01-utils/client-errors";
    import recipesModel from "../02-models/recipesModel";

    // log request time and method
    async function validateId(request: Request, response: Response, next: NextFunction): Promise<void> {

        const id = request.params.id;
        // id not send in url
        if (!id) {
            console.log('validateId middleware: no recipe id param');
            throw new ValidationError('No id was sent');
        }

        // no recipe with this id
        if (!await recipesModel.getRecipeById(id)) {
            console.log('validateId middleware: no recipe was found');
            throw new ResourceNotFoundError(id);
        }

        next();
    }

    export default validateId;