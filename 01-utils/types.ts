export type Recipe = {
    id: string,
    userId: string,
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
    userId: string,
    description: string,
    ingredients: string[],
    instructions: string[],
    cookingTime: number,
    servings: number,
    difficulty: 'easy' | 'medium' | 'hard',
    rating: number,
}

export type User = {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
}

export type BodyUser = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type DbUser = {
    id: string,
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string,
    updatedAt: string | null
}

export type Credentials = {
    email: string,
    password: string
}
