import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc,
  getDoc,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';
import { Recipe } from '../types/Recipe';
import { ShoppingList, ShoppingListIngredient, ShoppingListRecipe } from '../types/ShoppingList';

const SHOPPING_LISTS_COLLECTION = 'shoppingLists';

export const createShoppingList = async (userId: string, shoppingList: Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    const now = Timestamp.now();
    const listWithMetadata = {
      ...shoppingList,
      userId,
      createdAt: now,
      updatedAt: now,
      status: 'active' as const
    };

    const docRef = await addDoc(collection(db, SHOPPING_LISTS_COLLECTION), listWithMetadata);
    return { ...listWithMetadata, id: docRef.id };
  } catch (error) {
    console.error('Error creating shopping list:', error);
    throw error;
  }
};

export const getUserShoppingLists = async (userId: string): Promise<ShoppingList[]> => {
  if (!userId) {
    console.error('getUserShoppingLists called without userId');
    return [];
  }

  try {
    const q = query(
      collection(db, SHOPPING_LISTS_COLLECTION), 
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as ShoppingList[];
  } catch (error) {
    console.error('Error getting shopping lists:', error);
    throw error;
  }
};

export const updateShoppingList = async (listId: string, updates: Partial<ShoppingList>) => {
  try {
    const listRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    await updateDoc(listRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating shopping list:', error);
    throw error;
  }
};

export const deleteShoppingList = async (listId: string) => {
  try {
    await deleteDoc(doc(db, SHOPPING_LISTS_COLLECTION, listId));
  } catch (error) {
    console.error('Error deleting shopping list:', error);
    throw error;
  }
};

export const addRecipeToList = async (listId: string, recipe: Recipe): Promise<void> => {
  try {
    const listRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    const listSnap = await getDoc(listRef);
    if (!listSnap.exists()) throw new Error('Shopping list not found');

    const list = listSnap.data() as ShoppingList;
    const newRecipe: ShoppingListRecipe = {
      recipeId: recipe.id!,
      title: recipe.title,
      servings: '1',
      originalServings: '1'
    };

    const updatedRecipes = [...(list.recipes || []), newRecipe];
    
    await updateDoc(listRef, {
      recipes: updatedRecipes,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error adding recipe to list:', error);
    throw error;
  }
};

export const removeRecipeFromList = async (listId: string, recipeId: string): Promise<void> => {
  try {
    console.log('Removing recipe:', recipeId, 'from list:', listId);
    const listRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    const listSnap = await getDoc(listRef);
    if (!listSnap.exists()) throw new Error('Shopping list not found');

    const list = listSnap.data() as ShoppingList;
    console.log('Current list:', list);
    
    const updatedRecipes = list.recipes.filter(recipe => recipe.recipeId !== recipeId);
    console.log('Updated recipes:', updatedRecipes);
    
    // Mettre à jour les ingrédients
    const updatedIngredients = list.ingredients.map(ingredient => {
      if (ingredient.recipes.includes(recipeId)) {
        // Si l'ingrédient n'est utilisé que par cette recette, on le supprime
        if (ingredient.recipes.length === 1) {
          return null;
        }
        // Sinon, on retire juste cette recette de la liste des recettes
        return {
          ...ingredient,
          recipes: ingredient.recipes.filter(id => id !== recipeId)
        };
      }
      return ingredient;
    }).filter(ingredient => ingredient !== null) as ShoppingListIngredient[];

    console.log('Updated ingredients:', updatedIngredients);

    await updateDoc(listRef, {
      recipes: updatedRecipes,
      ingredients: updatedIngredients,
      updatedAt: Timestamp.now()
    });
    console.log('Update successful');
  } catch (error) {
    console.error('Error removing recipe from list:', error);
    throw error;
  }
};

export const updateIngredientStatus = async (
  listId: string,
  updatedIngredients: ShoppingListIngredient[]
): Promise<void> => {
  try {
    console.log('Updating ingredient status for list:', listId);
    console.log('Updated ingredients:', updatedIngredients);
    
    const listRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    const listSnap = await getDoc(listRef);
    if (!listSnap.exists()) throw new Error('Shopping list not found');

    const list = listSnap.data() as ShoppingList;
    
    // Mettre à jour uniquement le statut checked des ingrédients
    const mergedIngredients = list.ingredients.map(ingredient => {
      const updatedIngredient = updatedIngredients.find(
        i => i.name === ingredient.name && 
        i.recipes.every(r => ingredient.recipes.includes(r)) &&
        ingredient.recipes.every(r => i.recipes.includes(r))
      );
      return updatedIngredient ? { ...ingredient, checked: updatedIngredient.checked } : ingredient;
    });

    await updateDoc(listRef, {
      ingredients: mergedIngredients,
      updatedAt: Timestamp.now()
    });
    console.log('Update successful');
  } catch (error) {
    console.error('Error updating ingredient status:', error);
    throw error;
  }
};

export const updateRecipeServings = async (
  listId: string,
  recipeId: string,
  newServings: number,
  originalServings: number
): Promise<void> => {
  try {
    const listRef = doc(db, SHOPPING_LISTS_COLLECTION, listId);
    const listSnap = await getDoc(listRef);
    if (!listSnap.exists()) throw new Error('Shopping list not found');

    const list = listSnap.data() as ShoppingList;
    const ratio = newServings / originalServings;

    // Mettre à jour les portions de la recette
    const updatedRecipes = list.recipes.map(recipe =>
      recipe.recipeId === recipeId
        ? { ...recipe, servings: newServings.toString(), originalServings: recipe.originalServings }
        : recipe
    );

    // Mettre à jour les quantités des ingrédients
    const updatedIngredients = list.ingredients.map(ingredient => {
      if (ingredient.recipes.includes(recipeId)) {
        const baseQuantity = ingredient.quantity / parseFloat(list.recipes.find(r => r.recipeId === recipeId)?.servings || '1');
        const newQuantity = baseQuantity * newServings;
        return {
          ...ingredient,
          quantity: newQuantity
        };
      }
      return ingredient;
    });

    await updateDoc(listRef, {
      recipes: updatedRecipes,
      ingredients: updatedIngredients,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating recipe servings:', error);
    throw error;
  }
};
