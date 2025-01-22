import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    getDoc,
    Timestamp,
    orderBy,
    arrayUnion
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { ShoppingList, ShoppingListIngredient } from '../types/ShoppingList';
import { Recipe, Ingredient } from '../types/Recipe';
import { getAuth } from 'firebase/auth';

const SHOPPING_LISTS_COLLECTION = 'shoppingLists';

// Fonction pour fusionner les ingrédients similaires
const mergeIngredients = (ingredients: Ingredient[], recipeId: string): ShoppingListIngredient[] => {
    const mergedIngredients: { [key: string]: ShoppingListIngredient } = {};

    ingredients.forEach(ingredient => {
        const key = `${ingredient.name.toLowerCase()}-${ingredient.unit.toLowerCase()}`;
        if (mergedIngredients[key]) {
            mergedIngredients[key].quantity += ingredient.quantity;
            mergedIngredients[key].recipes.push(recipeId);
        } else {
            mergedIngredients[key] = {
                name: ingredient.name,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                checked: false,
                recipes: [recipeId]
            };
        }
    });

    return Object.values(mergedIngredients);
};

// Créer une nouvelle liste de courses
export const createShoppingList = async (name: string, recipes: Recipe[]): Promise<string> => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error('Utilisateur non connecté');
    }

    const shoppingListRecipes = recipes.map(recipe => ({
        recipeId: recipe.id!,
        title: recipe.title,
        servings: recipe.servings,
        originalServings: recipe.servings
    }));

    let allIngredients: ShoppingListIngredient[] = [];
    recipes.forEach(recipe => {
        const mergedIngredients = mergeIngredients(recipe.ingredients, recipe.id!);
        allIngredients = [...allIngredients, ...mergedIngredients];
    });

    // Fusionner les ingrédients similaires entre les recettes
    const finalIngredients = Object.values(
        allIngredients.reduce((acc, ingredient) => {
            const key = `${ingredient.name.toLowerCase()}-${ingredient.unit.toLowerCase()}`;
            if (acc[key]) {
                acc[key].quantity += ingredient.quantity;
                acc[key].recipes = [...new Set([...acc[key].recipes, ...ingredient.recipes])];
            } else {
                acc[key] = ingredient;
            }
            return acc;
        }, {} as { [key: string]: ShoppingListIngredient })
    );

    const newShoppingList: Omit<ShoppingList, 'id'> = {
        userId,
        name,
        recipes: shoppingListRecipes,
        ingredients: finalIngredients,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: 'active'
    };

    const docRef = await addDoc(collection(db, SHOPPING_LISTS_COLLECTION), newShoppingList);
    return docRef.id;
};

// Récupérer toutes les listes de courses de l'utilisateur
export const getUserShoppingLists = async (): Promise<ShoppingList[]> => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error('Utilisateur non connecté');
    }

    const q = query(
        collection(db, SHOPPING_LISTS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ShoppingList));
};

// Récupérer une liste de courses spécifique
export const getShoppingList = async (id: string): Promise<ShoppingList> => {
    const docRef = doc(db, SHOPPING_LISTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error('Liste de courses non trouvée');
    }

    return {
        id: docSnap.id,
        ...docSnap.data()
    } as ShoppingList;
};

// Mettre à jour le statut d'un ingrédient (coché/décoché)
export const updateIngredientStatus = async (
    listId: string,
    ingredients: ShoppingListIngredient[]
): Promise<void> => {
    const docRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    await updateDoc(docRef, {
        ingredients,
        updatedAt: Timestamp.now()
    });
};

// Mettre à jour le nombre de portions d'une recette
export const updateRecipeServings = async (
    listId: string,
    recipeId: string,
    newServings: string,
    ingredients: ShoppingListIngredient[]
): Promise<void> => {
    const docRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    const shoppingList = await getShoppingList(listId);
    
    const updatedRecipes = shoppingList.recipes.map(recipe => 
        recipe.recipeId === recipeId
            ? { ...recipe, servings: newServings }
            : recipe
    );

    await updateDoc(docRef, {
        recipes: updatedRecipes,
        ingredients,
        updatedAt: Timestamp.now()
    });
};

// Ajouter une recette à une liste de courses
export const addRecipeToList = async (listId: string, recipe: Recipe): Promise<void> => {
    const listRef = doc(db, 'shoppingLists', listId);
    const listDoc = await getDoc(listRef);
    if (!listDoc.exists()) {
        throw new Error('Liste non trouvée');
    }

    const list = listDoc.data() as ShoppingList;
    
    // Vérifier si la recette n'est pas déjà dans la liste
    if (list.recipes.some(r => r.recipeId === recipe.id)) {
        return;
    }

    // Ajouter la recette à la liste
    const newRecipe = {
        recipeId: recipe.id!,
        title: recipe.title,
        servings: recipe.servings,
        originalServings: recipe.servings
    };

    // Fusionner les ingrédients
    const updatedIngredients = [...list.ingredients];
    recipe.ingredients.forEach(newIng => {
        const existingIng = updatedIngredients.find(
            ing => ing.name.toLowerCase() === newIng.name.toLowerCase() && ing.unit === newIng.unit
        );

        if (existingIng) {
            existingIng.quantity += newIng.quantity;
            existingIng.recipes.push(recipe.id!);
        } else {
            updatedIngredients.push({
                name: newIng.name,
                quantity: newIng.quantity,
                unit: newIng.unit,
                checked: false,
                recipes: [recipe.id!]
            });
        }
    });

    await updateDoc(listRef, {
        recipes: arrayUnion(newRecipe),
        ingredients: updatedIngredients
    });
};

// Supprimer une recette d'une liste de courses
export const removeRecipeFromList = async (listId: string, recipeId: string): Promise<void> => {
    const listRef = doc(db, 'shoppingLists', listId);
    const listDoc = await getDoc(listRef);
    if (!listDoc.exists()) {
        throw new Error('Liste non trouvée');
    }

    const list = listDoc.data() as ShoppingList;
    
    // Retirer la recette de la liste
    const updatedRecipes = list.recipes.filter(r => r.recipeId !== recipeId);
    
    // Mettre à jour les ingrédients
    const updatedIngredients = list.ingredients
        .map(ing => {
            // Retirer la recette des références
            const updatedRecipes = ing.recipes.filter(r => r !== recipeId);
            
            if (updatedRecipes.length === 0) {
                // Si l'ingrédient n'est plus utilisé par aucune recette, le supprimer
                return null;
            }
            
            return {
                ...ing,
                recipes: updatedRecipes
            };
        })
        .filter((ing): ing is ShoppingListIngredient => ing !== null);

    await updateDoc(listRef, {
        recipes: updatedRecipes,
        ingredients: updatedIngredients
    });
};

// Supprimer une liste de courses
export const deleteShoppingList = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, SHOPPING_LISTS_COLLECTION, id));
};
