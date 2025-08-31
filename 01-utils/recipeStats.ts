import { Recipe } from "./types";

function totalCount(recipes: Recipe[]): number {
    return recipes.length;
}

function cookingTimeAVG(recipes: Recipe[]): number {
    let cookSum = 0;
    recipes.forEach(recipe => cookSum += recipe.cookingTime)
    return cookSum / recipes.length;
}

function recipesByDifficulty(recipes: Recipe[]) {
    const easyArr = [];
    const mediumArr = [];
    const hardArr = [];
    recipes.forEach(r => {
        switch (r.difficulty) {
            case 'easy':
                easyArr.push(r)
                break;
            case 'medium':
                mediumArr.push(r)
                break;
            case 'hard':
                hardArr.push(r)
                break;
            default:
                break;
        }
    })
    return easyArr.concat(mediumArr, hardArr);
}

export default {
    recipesByDifficulty, cookingTimeAVG, totalCount
}