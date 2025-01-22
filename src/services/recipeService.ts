import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc, Timestamp, increment, arrayUnion } from 'firebase/firestore';
import type { Recipe, CookingHistoryEntry } from '../types/Recipe';

export const createRecipe = async (recipe: Omit<Recipe, 'id' | 'timesCooked' | 'cookingHistory' | 'createdAt' | 'updatedAt'>): Promise<Recipe> => {
  try {
    console.log('Creating recipe with data:', recipe);
    // Nettoyer les champs vides
    const cleanedRecipe = {
      ...recipe,
      description: recipe.description || '',  // Utiliser une chaîne vide si null ou undefined
      prepTime: recipe.prepTime || '0',
      cookTime: recipe.cookTime || '0',
      servings: recipe.servings || '1',
      ingredients: recipe.ingredients?.filter(ing => ing.name.trim() !== '') || [],
      instructions: recipe.instructions?.filter(inst => inst.trim() !== '') || [],
      isVegetarian: recipe.isVegetarian || false
    };

    const newRecipe = {
      ...cleanedRecipe,
      timesCooked: 0,
      cookingHistory: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'recipes'), newRecipe);
    console.log('Recipe created with ID:', docRef.id);

    return { 
      ...newRecipe, 
      id: docRef.id
    } as Recipe;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

export const getUserRecipes = async (userId: string): Promise<Recipe[]> => {
  try {
    console.log('Getting recipes for user:', userId);
    const q = query(collection(db, 'recipes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    console.log('Found recipes:', querySnapshot.docs.length);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Recipe data:', data);
      return {
        ...data,
        id: doc.id,
        ingredients: data.ingredients || [],
        instructions: data.instructions || [],
        timesCooked: data.timesCooked || 0,
        cookingHistory: (data.cookingHistory || []).map((entry: any) => ({
          date: entry.date,
          note: entry.note
        })),
        createdAt: data.createdAt || Timestamp.now(),
        updatedAt: data.updatedAt || Timestamp.now(),
        isVegetarian: data.isVegetarian || false
      } as Recipe;
    });
  } catch (error) {
    console.error('Error getting recipes:', error);
    throw error;
  }
};

export const updateRecipe = async (id: string, recipe: Partial<Recipe>): Promise<void> => {
  try {
    console.log('Updating recipe:', id, recipe);
    const recipeRef = doc(db, 'recipes', id);
    const updateData = {
      ...recipe,
      updatedAt: Timestamp.now(),
      isVegetarian: recipe.isVegetarian ?? false
    };

    if (updateData.createdAt instanceof Date) {
      updateData.createdAt = Timestamp.fromDate(updateData.createdAt);
    }
    if (updateData.updatedAt instanceof Date) {
      updateData.updatedAt = Timestamp.fromDate(updateData.updatedAt);
    }
    if (updateData.cookingHistory) {
      updateData.cookingHistory = updateData.cookingHistory.map(entry => ({
        ...entry,
        date: entry.date instanceof Date ? Timestamp.fromDate(entry.date) : entry.date
      }));
    }

    await updateDoc(recipeRef, updateData);
    console.log('Recipe updated successfully');
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

export const deleteRecipe = async (id: string): Promise<void> => {
  try {
    console.log('Deleting recipe:', id);
    const recipeRef = doc(db, 'recipes', id);
    await deleteDoc(recipeRef);
    console.log('Recipe deleted successfully');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

export const incrementTimesCooked = async (recipeId: string, note?: string): Promise<void> => {
  try {
    console.log('Incrementing times cooked for recipe:', recipeId);
    const recipeRef = doc(db, 'recipes', recipeId);
    const historyEntry = {
      date: Timestamp.now(),
      note
    };
    
    await updateDoc(recipeRef, {
      timesCooked: increment(1),
      cookingHistory: arrayUnion(historyEntry),
      updatedAt: Timestamp.now()
    });
    console.log('Times cooked incremented successfully');
  } catch (error) {
    console.error('Error incrementing times cooked:', error);
    throw error;
  }
};
