import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Box, CircularProgress } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../contexts/AuthContext';
import { getUserRecipes, createRecipe, updateRecipe, deleteRecipe } from '../services/recipeService';

const IdeasRepas: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log('Auth state changed:', { currentUser });
    if (currentUser) {
      console.log('User is logged in:', currentUser.uid);
      loadRecipes();
    } else {
      console.log('No user logged in');
    }
  }, [currentUser]);

  const loadRecipes = async () => {
    if (!currentUser) {
      console.log('Cannot load recipes: no user logged in');
      return;
    }
    try {
      setLoading(true);
      console.log('Loading recipes for user:', currentUser.uid);
      const userRecipes = await getUserRecipes(currentUser.uid);
      console.log('Loaded recipes:', userRecipes);
      setRecipes(userRecipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (recipeData: Omit<Recipe, 'id' | 'timesCooked' | 'cookingHistory' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) {
      console.log('Cannot create recipe: no user logged in');
      return;
    }
    try {
      const newRecipe = await createRecipe({
        ...recipeData,
        userId: currentUser.uid,
      });
      console.log('Created recipe:', newRecipe);
      await loadRecipes(); // Recharger toutes les recettes
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleUpdateRecipe = async (recipeData: Omit<Recipe, 'id' | 'timesCooked' | 'cookingHistory' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser || !selectedRecipe) {
      console.log('Cannot update recipe:', { currentUser, selectedRecipe });
      return;
    }
    try {
      await updateRecipe(selectedRecipe.id!, {
        ...recipeData,
        userId: currentUser.uid,
      });
      await loadRecipes(); // Recharger toutes les recettes
      setSelectedRecipe(undefined);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsFormOpen(true);
  };

  if (!currentUser) {
    console.log('Rendering login message because currentUser is null');
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <h2>Veuillez vous connecter pour voir vos recettes</h2>
        </Box>
      </Container>
    );
  }

  console.log('Rendering main content with user:', currentUser.uid);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <h1>Mes Recettes</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedRecipe(undefined);
            setIsFormOpen(true);
          }}
        >
          Ajouter une recette
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : recipes.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <h3>Aucune recette pour le moment</h3>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                onEdit={() => handleEditRecipe(recipe)}
                onDelete={() => handleDeleteRecipe(recipe.id!)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <RecipeForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedRecipe(undefined);
        }}
        onSubmit={selectedRecipe ? handleUpdateRecipe : handleCreateRecipe}
        initialData={selectedRecipe}
      />
    </Container>
  );
};

export default IdeasRepas;
