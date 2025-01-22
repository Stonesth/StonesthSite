import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Button, Box, CircularProgress, TextField, Slider, Typography, FormControlLabel, Switch, Checkbox, Chip, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../contexts/AuthContext';
import { getUserRecipes, createRecipe, updateRecipe, deleteRecipe } from '../services/recipeService';
import { useNavigate } from 'react-router-dom';

const IdeasRepas: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // États pour la recherche et les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [prepTimeRange, setPrepTimeRange] = useState<number[]>([0, 180]);
  const [cookTimeRange, setCookTimeRange] = useState<number[]>([0, 180]);
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false);

  const loadRecipes = useCallback(async () => {
    if (!currentUser) {
      console.log('Cannot load recipes: no user logged in');
      return;
    }
    try {
      setLoading(true);
      const userRecipes = await getUserRecipes(currentUser.uid);
      setRecipes(userRecipes);
      setFilteredRecipes(userRecipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadRecipes();
    }
  }, [currentUser, loadRecipes]);

  // Appliquer les filtres chaque fois qu'un critère change
  useEffect(() => {
    console.log('Début du filtrage');
    let filtered = [...recipes];

    // Filtre par recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(recipe => {
        const title = recipe.title?.toLowerCase() || '';
        const description = recipe.description?.toLowerCase() || '';
        const ingredients = recipe.ingredients?.join(' ').toLowerCase() || '';
        const instructions = recipe.instructions?.join(' ').toLowerCase() || '';
        
        return title.includes(query) || 
               description.includes(query) || 
               ingredients.includes(query) || 
               instructions.includes(query);
      });
    }

    // Filtre végétarien
    if (showVegetarianOnly) {
      filtered = filtered.filter(recipe => recipe.isVegetarian);
    }

    // Filtre par temps de préparation et de cuisson
    filtered = filtered.filter(recipe => {
      // Convertir les temps en nombres en gérant les cas particuliers
      const prepTimeStr = recipe.prepTime || '0';
      const cookTimeStr = recipe.cookTime || '0';
      
      // Enlever tout ce qui n'est pas un chiffre et convertir en nombre
      const prepTime = parseInt(prepTimeStr.replace(/[^\d]/g, '')) || 0;
      const cookTime = parseInt(cookTimeStr.replace(/[^\d]/g, '')) || 0;

      console.log('Filtrage de la recette:', {
        title: recipe.title,
        prepTimeStr,
        cookTimeStr,
        prepTime,
        cookTime,
        prepTimeRange,
        cookTimeRange
      });

      // Vérifier si les temps sont dans les plages définies
      const isPrepTimeInRange = prepTime >= prepTimeRange[0] && prepTime <= prepTimeRange[1];
      const isCookTimeInRange = cookTime >= cookTimeRange[0] && cookTime <= cookTimeRange[1];

      console.log('Résultat du filtrage:', {
        title: recipe.title,
        isPrepTimeInRange,
        isCookTimeInRange
      });

      return isPrepTimeInRange && isCookTimeInRange;
    });

    console.log('Recettes filtrées:', filtered);
    setFilteredRecipes(filtered);
  }, [recipes, searchQuery, prepTimeRange, cookTimeRange, showVegetarianOnly]);

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h${mins}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  const handleCreateRecipe = async (recipeData: Omit<Recipe, 'id' | 'timesCooked' | 'cookingHistory' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;
    try {
      await createRecipe({
        ...recipeData,
        userId: currentUser.uid,
      });
      await loadRecipes();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleUpdateRecipe = async (recipeData: Omit<Recipe, 'id' | 'timesCooked' | 'cookingHistory' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser || !selectedRecipe) return;
    try {
      await updateRecipe(selectedRecipe.id!, {
        ...recipeData,
        userId: currentUser.uid,
      });
      await loadRecipes();
      setSelectedRecipe(undefined);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      await loadRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsFormOpen(true);
  };

  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <h2>Veuillez vous connecter pour voir vos recettes</h2>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Idées Repas
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/shopping-lists')}
            startIcon={<ShoppingCartIcon />}
          >
            Liste de courses
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsFormOpen(true)}
            startIcon={<AddIcon />}
          >
            Ajouter une recette
          </Button>
        </Box>
      </Box>

      {/* Barre de recherche */}
      <Box mb={3}>
        <TextField
          fullWidth
          label="Rechercher une recette..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showAdvancedFilters}
              onChange={(e) => setShowAdvancedFilters(e.target.checked)}
            />
          }
          label="Filtres avancés"
        />
      </Box>

      <Box mb={3} p={2} bgcolor="background.paper" borderRadius={1}>
        <Typography variant="subtitle1" gutterBottom>
          Légende des badges :
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              icon={<RestaurantIcon />}
              label="Végétarien"
              color="success"
              size="small"
            />
            <Typography variant="body2">: Recette végétarienne</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              icon={<Badge badgeContent={0} color="default" max={99} />}
              label="Réalisée"
              color="default"
              variant="outlined"
              size="small"
            />
            <Typography variant="body2">: Recette jamais réalisée</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              icon={<Badge badgeContent={1} color="primary" max={99} />}
              label="Réalisée"
              color="primary"
              size="small"
            />
            <Typography variant="body2">: Recette réalisée (le nombre indique le total de réalisations)</Typography>
          </Box>
        </Box>
      </Box>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <Box mb={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showVegetarianOnly}
                onChange={(e) => setShowVegetarianOnly(e.target.checked)}
                color="primary"
              />
            }
            label="Afficher uniquement les recettes végétariennes"
          />

          <Typography gutterBottom sx={{ mt: 2 }}>
            Temps de préparation : {formatTime(prepTimeRange[0])} - {formatTime(prepTimeRange[1])}
          </Typography>
          <Slider
            value={prepTimeRange}
            onChange={(_, newValue) => {
              console.log('Nouveau temps de préparation:', newValue);
              setPrepTimeRange(newValue as number[]);
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={formatTime}
            min={0}
            max={180}
            step={5}
            marks={[
              { value: 0, label: '0min' },
              { value: 30, label: '30min' },
              { value: 60, label: '1h' },
              { value: 120, label: '2h' },
              { value: 180, label: '3h' }
            ]}
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>
            Temps de cuisson : {formatTime(cookTimeRange[0])} - {formatTime(cookTimeRange[1])}
          </Typography>
          <Slider
            value={cookTimeRange}
            onChange={(_, newValue) => {
              console.log('Nouveau temps de cuisson:', newValue);
              setCookTimeRange(newValue as number[]);
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={formatTime}
            min={0}
            max={180}
            step={5}
            marks={[
              { value: 0, label: '0min' },
              { value: 30, label: '30min' },
              { value: 60, label: '1h' },
              { value: 120, label: '2h' },
              { value: 180, label: '3h' }
            ]}
          />
        </Box>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : filteredRecipes.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <h3>Aucune recette trouvée</h3>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} md={6} lg={4} key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                onUpdate={loadRecipes}
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
