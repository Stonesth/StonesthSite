import { auth } from '../firebase';

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];
  instructions: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PROJECT_ID = 'monsite-5f920';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

export const recipeService = {
  async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error('User not authenticated');

      const response = await fetch(`${BASE_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            title: { stringValue: recipe.title },
            description: { stringValue: recipe.description },
            prepTime: { stringValue: recipe.prepTime },
            cookTime: { stringValue: recipe.cookTime },
            servings: { stringValue: recipe.servings },
            ingredients: {
              arrayValue: {
                values: recipe.ingredients.map(ing => ({
                  mapValue: {
                    fields: {
                      name: { stringValue: ing.name },
                      quantity: { stringValue: ing.quantity },
                      unit: { stringValue: ing.unit }
                    }
                  }
                }))
              }
            },
            instructions: {
              arrayValue: {
                values: recipe.instructions.map(inst => ({
                  stringValue: inst
                }))
              }
            },
            userId: { stringValue: recipe.userId },
            createdAt: { timestampValue: new Date().toISOString() },
            updatedAt: { timestampValue: new Date().toISOString() }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.name.split('/').pop();
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  },

  async getUserRecipes(userId: string): Promise<Recipe[]> {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error('User not authenticated');

      const response = await fetch(`${BASE_URL}/recipes`, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Si aucun document n'existe, retourner un tableau vide
      if (!data.documents) {
        return [];
      }

      return data.documents
        .filter((doc: any) => {
          try {
            return doc.fields?.userId?.stringValue === userId;
          } catch (e) {
            console.error('Error filtering document:', e);
            return false;
          }
        })
        .map((doc: any) => {
          try {
            const fields = doc.fields || {};
            return {
              id: doc.name.split('/').pop(),
              title: fields.title?.stringValue || '',
              description: fields.description?.stringValue || '',
              prepTime: fields.prepTime?.stringValue || '',
              cookTime: fields.cookTime?.stringValue || '',
              servings: fields.servings?.stringValue || '',
              ingredients: fields.ingredients?.arrayValue?.values?.map((ing: any) => ({
                name: ing.mapValue?.fields?.name?.stringValue || '',
                quantity: ing.mapValue?.fields?.quantity?.stringValue || '',
                unit: ing.mapValue?.fields?.unit?.stringValue || ''
              })) || [],
              instructions: fields.instructions?.arrayValue?.values?.map((inst: any) => 
                inst.stringValue || ''
              ) || [],
              userId: fields.userId?.stringValue || '',
              createdAt: new Date(fields.createdAt?.timestampValue || new Date()),
              updatedAt: new Date(fields.updatedAt?.timestampValue || new Date())
            };
          } catch (e) {
            console.error('Error mapping document:', e);
            return null;
          }
        })
        .filter((recipe: Recipe | null): recipe is Recipe => recipe !== null);
    } catch (error) {
      console.error('Error getting recipes:', error);
      throw error;
    }
  },

  async updateRecipe(id: string, recipe: Partial<Recipe>): Promise<void> {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error('User not authenticated');

      // L'ID de la recette doit être le dernier segment du chemin
      const documentPath = `recipes/${id}`;

      // Préparation des données pour l'API Firestore
      const fields: any = {
        updatedAt: { timestampValue: new Date().toISOString() }
      };

      // Ajout conditionnel des champs à mettre à jour
      if (recipe.title) fields.title = { stringValue: recipe.title };
      if (recipe.description) fields.description = { stringValue: recipe.description };
      if (recipe.prepTime) fields.prepTime = { stringValue: recipe.prepTime };
      if (recipe.cookTime) fields.cookTime = { stringValue: recipe.cookTime };
      if (recipe.servings) fields.servings = { stringValue: recipe.servings };
      
      if (recipe.ingredients && recipe.ingredients.length > 0) {
        fields.ingredients = {
          arrayValue: {
            values: recipe.ingredients.map(ing => ({
              mapValue: {
                fields: {
                  name: { stringValue: ing.name },
                  quantity: { stringValue: ing.quantity },
                  unit: { stringValue: ing.unit }
                }
              }
            }))
          }
        };
      }

      if (recipe.instructions && recipe.instructions.length >= 0) {
        fields.instructions = {
          arrayValue: {
            values: recipe.instructions.map(inst => ({
              stringValue: inst
            }))
          }
        };
      }

      // Construction des champs à mettre à jour dans l'URL
      const updateMask = Object.keys(fields)
        .map(field => `updateMask.fieldPaths=${field}`)
        .join('&');

      const response = await fetch(`${BASE_URL}/${documentPath}?${updateMask}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Update response:', responseData);
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  },

  async deleteRecipe(id: string): Promise<void> {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error('User not authenticated');

      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },
};
