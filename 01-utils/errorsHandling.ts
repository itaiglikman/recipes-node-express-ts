import { Error } from "mongoose";
import { ValidationError } from "./client-errors";

// handle cast error message for incorrect type in schema:
const handleCastError = (): [() => any, (value: any, path: string, model: any, kind: string) => string] => {
    return [null, (value: any, path: string, model: any, kind: string) => `${path} must be a ${kind}`];
};

function handleSchemaErrors(validationError: Error.ValidationError) {
    const fieldErrors = Object.values(validationError.errors).map((error: Error.ValidatorError | Error.CastError) => error.message);
    throw new ValidationError(fieldErrors.join(', '));
}

export default {
    handleCastError, handleSchemaErrors
}