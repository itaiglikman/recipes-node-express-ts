import { body } from "express-validator";

// validation schema req.body of new recipe object:
const recipeValidationSchema = [
    body('title')
        .trim()
        .exists()
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 5, max: 30 }).withMessage('Title must be between 5 and 30 characters')
    ,
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters')
    ,
    body('ingredients')
        .exists().withMessage('Ingredients field is required')
        .isArray().withMessage('Ingredients must be an array')
        // no empty arrays
        .custom(arr => Array.isArray(arr) && arr.length > 0).withMessage('Ingredients array must not be empty')
    ,
    body('ingredients.*') //validate each item in the array
        .trim()
        .isString().withMessage('Each ingredient must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Each ingredient must be between 2 and 100 characters')
    ,
    body('instructions')
        .exists().withMessage('Instructions field is required')
        .isArray().withMessage('Instructions must be an array')
        // no empty arrays
        .custom(arr => Array.isArray(arr) && arr.length > 0).withMessage('Instructions array must not be empty')
    ,
    body('instructions.*') //validate each item in the array
        .trim()
        .isString().withMessage('Each instruction must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Each instruction must be between 2 and 100 characters')
    ,
    body('cookingTime')
        .notEmpty().withMessage('Cooking time is required')
        .isNumeric().withMessage('Cooking time must be a number')
        .isInt({ min: 1, max: 300 }).withMessage('Cooking time must be between 1 and 300')
        .toInt()
    ,
    body('servings')
        .notEmpty().withMessage('Servings is required')
        .isNumeric().withMessage('Servings must be a number')
        .isInt({ min: 1, max: 20 }).withMessage('Servings must be between 1 and 20')
        .toInt()
    ,
    body('difficulty')
        .notEmpty().withMessage('Difficulty is required')
        .isString().withMessage('Difficulty must be a string')
        .isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be one of: easy, medium, hard')
    ,
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isFloat({ min: 0, max: 5 }).withMessage('Rating must be a decimal between 0 and 5')
        .toFloat()
    ,
];

export default recipeValidationSchema;
