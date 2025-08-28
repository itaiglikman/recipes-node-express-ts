// export type CustomErr = {
//     status: number,
//     message: string
// }

// export class ClientError {

//     public status: number;
//     public message: string;

//     public constructor(status: number, message: string) {
//         this.status = status;
//         this.message = message;
//     }

// }

export type Recipe = {
    id: string,
    title: string,
    description: string,
    ingredients: string[],
    instructions: string[],
    cookingTime: number,
    servings: number,
    difficulty: 'easy' | 'medium' | 'hard',
    rating: number,
    createdAt: string
}

export type BodyRecipe = {
    title: string,
    description: string,
    ingredients: string[],
    instructions: string[],
    cookingTime: number,
    servings: number,
    difficulty: 'easy' | 'medium' | 'hard',
    rating: number,
}
