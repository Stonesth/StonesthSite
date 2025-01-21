import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, CircularProgress, Box, Button, Grid, TextField, InputAdornment, Slider, FormControl, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';
import { recipeService, Recipe } from '../services/recipeService';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const IdeasRepas: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilters, setTimeFilters] = useState({
    prepTime: [0, 180],
    cookTime: [0, 180],
    showAdvancedFilters: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadRecipes();
    }
  }, [user]);

  const loadRecipes = async () => {
    if (!user) return;
    
    try {
      setLoadingRecipes(true);
      const userRecipes = await recipeService.getUserRecipes(user.uid);
      setRecipes(userRecipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
      // TODO: Ajouter une notification d'erreur
    } finally {
      setLoadingRecipes(false);
    }
  };

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      if (editingRecipe?.id) {
        console.log('Updating recipe with ID:', editingRecipe.id);
        // Mise à jour d'une recette existante
        await recipeService.updateRecipe(editingRecipe.id, {
          ...recipeData,
          userId: user.uid,
        });
        console.log('Recipe updated successfully');
      } else {
        console.log('Creating new recipe');
        // Création d'une nouvelle recette
        await recipeService.createRecipe({
          ...recipeData,
          userId: user.uid,
        });
        console.log('Recipe created successfully');
      }
      setShowForm(false);
      setEditingRecipe(null);
      loadRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
      // TODO: Ajouter une notification d'erreur
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      return;
    }

    try {
      await recipeService.deleteRecipe(recipeId);
      loadRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // TODO: Ajouter une notification d'erreur
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      recipe.title.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some(ing => 
        ing.name.toLowerCase().includes(searchLower) ||
        ing.unit.toLowerCase().includes(searchLower)
      ) ||
      recipe.instructions.some(inst => 
        inst.toLowerCase().includes(searchLower)
      )
    );

    if (!matchesSearch) return false;

    // Convertir les temps en nombres pour la comparaison
    const prepTimeNum = parseInt(recipe.prepTime) || 0;
    const cookTimeNum = parseInt(recipe.cookTime) || 0;

    return (
      prepTimeNum >= timeFilters.prepTime[0] &&
      prepTimeNum <= timeFilters.prepTime[1] &&
      cookTimeNum >= timeFilters.cookTime[0] &&
      cookTimeNum <= timeFilters.cookTime[1]
    );
  });

  const handleTimeFilterChange = (type: 'prepTime' | 'cookTime') => (event: Event, newValue: number | number[]) => {
    setTimeFilters(prev => ({
      ...prev,
      [type]: newValue as number[]
    }));
  };

  const formatTime = (value: number) => {
    if (value >= 60) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return minutes > 0 ? `${hours}h${minutes}min` : `${hours}h`;
    }
    return `${value}min`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1">
              Idées Repas
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingRecipe(null);
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Fermer' : 'Nouvelle Recette'}
            </Button>
          </Box>
        </Grid>

        {showForm && (
          <Grid item xs={12}>
            <RecipeForm 
              onSubmit={handleSubmit}
              initialRecipe={editingRecipe}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Rechercher une recette par titre, ingrédients ou instructions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={timeFilters.showAdvancedFilters}
                  onChange={(e) => setTimeFilters(prev => ({
                    ...prev,
                    showAdvancedFilters: e.target.checked
                  }))}
                />
              }
              label="Filtres avancés"
            />

            {timeFilters.showAdvancedFilters && (
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography gutterBottom>
                  Temps de préparation : {formatTime(timeFilters.prepTime[0])} - {formatTime(timeFilters.prepTime[1])}
                </Typography>
                <Slider
                  value={timeFilters.prepTime}
                  onChange={handleTimeFilterChange('prepTime')}
                  valueLabelDisplay="auto"
                  valueLabelFormat={formatTime}
                  min={0}
                  max={180}
                  sx={{ mb: 4 }}
                />

                <Typography gutterBottom>
                  Temps de cuisson : {formatTime(timeFilters.cookTime[0])} - {formatTime(timeFilters.cookTime[1])}
                </Typography>
                <Slider
                  value={timeFilters.cookTime}
                  onChange={handleTimeFilterChange('cookTime')}
                  valueLabelDisplay="auto"
                  valueLabelFormat={formatTime}
                  min={0}
                  max={180}
                />
              </Paper>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          {loadingRecipes ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : filteredRecipes.length === 0 ? (
            <Paper sx={{ p: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {recipes.length === 0 
                  ? "Aucune recette pour le moment. Commencez par en créer une !"
                  : "Aucune recette ne correspond à votre recherche."}
              </Typography>
            </Paper>
          ) : (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                canEdit={recipe.userId === user.uid}
              />
            ))
          )}
        </Grid>
      </Grid>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Dernière mise à jour : 21 janvier 2025
      </Typography>
    </Container>
  );
};

export default IdeasRepas;
