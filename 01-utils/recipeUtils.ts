import { Request } from "express";
import { Result, ValidationError } from "express-validator";
import { RouteNotFoundError, ValidationError as ValidationErrorClient } from "./client-errors";
import { BodyRecipe, Recipe } from "./types";

function handleRecipeValidationError(errors: Result<ValidationError>) {
    const msgSet = new Set();
    const errObj = errors.mapped(); // get an object of each prop errors
    for (const prop in errObj) { // get first error of each prop
        msgSet.add(errObj[prop].msg);
    }
    const msg = [...msgSet].join(', ');
    console.log('validate recipe errors: ', msgSet);
    throw new ValidationErrorClient(msg);
}

function filterByQuery(request: Request, recipes: Recipe[]): Recipe[] | void {
    const query = request.query;
    for (const q in query) {
        const queryVal = query[q] as string;
        switch (q) {
            case 'difficulty':
                // throw if no valid input:
                if (!['easy', 'medium', 'hard'].includes(queryVal))
                    throw new RouteNotFoundError(request.originalUrl);
                return recipes.filter(r => r.difficulty === queryVal);
            case 'maxCookingTime':
                // get recipe with max cookingTime:
                // return as array:
                return [recipes.reduce((maxRec, currRec) =>
                    currRec.cookingTime > maxRec.cookingTime ? currRec : maxRec
                    , recipes[0])];
            case 'search':
                return recipes.filter(r =>
                    r.title.toLowerCase().includes(queryVal) ||
                    r.description.toLowerCase().includes(queryVal)
                )
            default:
                console.log('no matching query ' + q);
                throw new RouteNotFoundError(request.originalUrl)
        }
    }
}

// modify BodyRecipe arrays to strings to save in db:
function stringifyArrValuesForQuery(body: BodyRecipe, id: string) {
    const strIngredients = JSON.stringify(body.ingredients);
    const strInstructions = JSON.stringify(body.instructions);
    const queryBody = { ...body, ingredients: strIngredients, instructions: strInstructions }
    return { id, ...queryBody };
}


export default {
    filterByQuery, handleRecipeValidationError, stringifyArrValuesForQuery
}