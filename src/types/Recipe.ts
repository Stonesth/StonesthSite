import { Timestamp } from 'firebase/firestore';

export interface Recipe {
    id?: string;
    userId: string;
    title: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    ingredients: Ingredient[];
    instructions: string[];
    timesCooked: number;
    cookingHistory: CookingHistoryEntry[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export interface CookingHistoryEntry {
    date: Timestamp;
    note?: string;
}
