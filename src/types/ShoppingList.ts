import { Timestamp } from 'firebase/firestore';
import { Recipe } from './Recipe';

export interface ShoppingList {
    id?: string;
    userId: string;
    name: string;
    recipes: ShoppingListRecipe[];
    ingredients: ShoppingListIngredient[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    status: 'active' | 'completed';
}

export interface ShoppingListRecipe {
    recipeId: string;
    title: string;
    servings: string;
    originalServings: string;
}

export interface ShoppingListIngredient {
    name: string;
    quantity: number;
    unit: string;
    checked: boolean;
    recipes: string[]; // Liste des IDs des recettes qui utilisent cet ingrédient
}
