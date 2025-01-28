import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
  Stack,
  Chip,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../contexts/AuthContext';
import { getAllRecipes } from '../services/recipeService';
import { createShoppingList } from '../services/shoppingListService';
import { useNavigate } from 'react-router-dom';

interface RandomRecipeProps {
  onSelectRecipe?: (recipe: Recipe) => void;
}

interface FilterOptions {
  maxPrepTime: number;
  maxCookTime: number;
  isVegetarian: boolean;
  minTimesCooked: number;
  maxTimesCooked: number;
  numberOfRecipes: number;
}

interface RecipeWithSelection extends Recipe {
  isSelected: boolean;
}

const MAX_SUGGESTIONS = 7;

const RandomRecipe: React.FC<RandomRecipeProps> = ({ onSelectRecipe }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<RecipeWithSelection[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrepTime: 60,
    maxCookTime: 60,
    isVegetarian: false,
    minTimesCooked: 0,
    maxTimesCooked: 100,
    numberOfRecipes: 3
  });
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadRecipes();
  }, [currentUser]);

  const loadRecipes = async () => {
    if (!currentUser) return;
    try {
      const loadedRecipes = await getAllRecipes();
      setRecipes(loadedRecipes.filter(recipe => recipe.userId === currentUser.uid));
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  const filterRecipes = (recipes: Recipe[]): Recipe[] => {
    return recipes.filter(recipe => {
      const prepTime = parseInt(recipe.prepTime) || 0;
      const cookTime = parseInt(recipe.cookTime) || 0;
      const timesCooked = recipe.timesCooked || 0;

      return (
        prepTime <= filters.maxPrepTime &&
        cookTime <= filters.maxCookTime &&
        (!filters.isVegetarian || recipe.isVegetarian) &&
        timesCooked >= filters.minTimesCooked &&
        timesCooked <= filters.maxTimesCooked
      );
    });
  };

  const selectRandomRecipes = (keepSelected: boolean = false) => {
    setLoading(true);
    const filteredRecipes = filterRecipes(recipes);
    
    if (filteredRecipes.length === 0) {
      setSelectedRecipes([]);
      setLoading(false);
      return;
    }

    // Garder les recettes sélectionnées si demandé
    const keptRecipes = keepSelected ? selectedRecipes.filter(r => r.isSelected) : [];
    const neededRecipes = filters.numberOfRecipes - keptRecipes.length;

    if (neededRecipes <= 0) {
      setLoading(false);
      return;
    }

    // Exclure les recettes déjà sélectionnées
    const availableRecipes = filteredRecipes.filter(
      recipe => !keptRecipes.some(kept => kept.id === recipe.id)
    );

    // Calculer les poids pour les nouvelles recettes
    const recipesWithWeights = availableRecipes.map(recipe => ({
      recipe,
      weight: 100 - Math.min(recipe.timesCooked || 0, 99)
    }));

    // Trier par poids de manière aléatoire
    recipesWithWeights.sort(() => Math.random() - 0.5);
    recipesWithWeights.sort((a, b) => b.weight - a.weight);
    
    // Sélectionner les nouvelles recettes
    const newRecipes = recipesWithWeights
      .slice(0, Math.min(neededRecipes, recipesWithWeights.length))
      .map(item => ({
        ...item.recipe,
        isSelected: false
      }));

    // Combiner les recettes gardées et les nouvelles
    setTimeout(() => {
      setSelectedRecipes([...keptRecipes, ...newRecipes]);
      setLoading(false);
    }, 500);
  };

  const toggleRecipeSelection = (recipeId: string) => {
    setSelectedRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, isSelected: !recipe.isSelected }
          : recipe
      )
    );
  };

  const handleFilterChange = (field: keyof FilterOptions, value: number | boolean) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegenerateUnselected = () => {
    selectRandomRecipes(true);
  };

  const handleCreateShoppingList = async () => {
    if (!currentUser) {
      setError("Vous devez être connecté pour créer une liste de courses");
      return;
    }

    try {
      const listName = `Liste du ${new Date().toLocaleDateString('fr-FR')}`;
      await createShoppingList(currentUser.uid, {
        name: listName,
        recipes: selectedRecipes.filter(recipe => recipe.isSelected).map(recipe => ({
          recipeId: recipe.id!,
          title: recipe.title,
          servings: recipe.servings,
          originalServings: recipe.servings
        })),
        ingredients: selectedRecipes.filter(recipe => recipe.isSelected).flatMap(recipe => 
          recipe.ingredients?.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity || 0,
            unit: ingredient.unit,
            checked: false,
            recipes: [recipe.id!]
          })) || []
        ),
        userId: currentUser.uid
      });

      // Rediriger vers la page des listes de courses
      navigate('/shopping-lists');
    } catch (error) {
      console.error('Error creating shopping list:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Suggestions de Recettes
      </Typography>

      {/* Filtres */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtres
          </Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <Typography gutterBottom>
                Nombre de suggestions : {filters.numberOfRecipes}
              </Typography>
              <Slider
                value={filters.numberOfRecipes}
                onChange={(_, value) => handleFilterChange('numberOfRecipes', value as number)}
                min={1}
                max={MAX_SUGGESTIONS}
                marks
                step={1}
                valueLabelDisplay="auto"
              />
            </FormControl>

            <Box>
              <Typography gutterBottom>
                Temps de préparation max: {filters.maxPrepTime} min
              </Typography>
              <Slider
                value={filters.maxPrepTime}
                onChange={(_, value) => handleFilterChange('maxPrepTime', value as number)}
                min={0}
                max={120}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Box>
              <Typography gutterBottom>
                Temps de cuisson max: {filters.maxCookTime} min
              </Typography>
              <Slider
                value={filters.maxCookTime}
                onChange={(_, value) => handleFilterChange('maxCookTime', value as number)}
                min={0}
                max={120}
                valueLabelDisplay="auto"
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isVegetarian}
                  onChange={(e) => handleFilterChange('isVegetarian', e.target.checked)}
                />
              }
              label="Végétarien uniquement"
            />

            <Box>
              <Typography gutterBottom>
                Nombre de réalisations: {filters.minTimesCooked} - {filters.maxTimesCooked}
              </Typography>
              <Slider
                value={[filters.minTimesCooked, filters.maxTimesCooked]}
                onChange={(_, value) => {
                  const [min, max] = value as number[];
                  handleFilterChange('minTimesCooked', min);
                  handleFilterChange('maxTimesCooked', max);
                }}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Boutons d'action */}
      <Stack 
        direction={isMobile ? "column" : "row"} 
        spacing={2} 
        sx={{ 
          mb: 2,
          '& .MuiButton-root': {
            minWidth: isMobile ? 'auto' : '200px'
          }
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => selectRandomRecipes(false)}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
          fullWidth={!isMobile}
          disabled={loading}
          size={isMobile ? "medium" : "large"}
        >
          {loading ? 'Recherche...' : 'Nouvelles suggestions'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleRegenerateUnselected}
          startIcon={<RefreshIcon />}
          fullWidth={!isMobile}
          disabled={loading}
          size={isMobile ? "medium" : "large"}
        >
          Régénérer non sélectionnées
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleCreateShoppingList}
          startIcon={<ShoppingCartIcon />}
          fullWidth={!isMobile}
          disabled={loading || !selectedRecipes.some(r => r.isSelected)}
          size={isMobile ? "medium" : "large"}
        >
          Créer liste de courses
        </Button>
      </Stack>

      {/* Grille des recettes sélectionnées */}
      <Grid container spacing={2}>
        {selectedRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: recipe.isSelected ? 'action.selected' : 'background.paper'
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={recipe.isSelected}
                        onChange={() => recipe.id && toggleRecipeSelection(recipe.id)}
                      />
                    }
                    label={recipe.title}
                    sx={{ flexGrow: 1 }}
                  />
                </Box>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" gap={1}>
                  {recipe.isVegetarian && (
                    <Chip label="Végétarien" color="success" size="small" />
                  )}
                  <Chip 
                    label={`${recipe.timesCooked || 0} réalisation${recipe.timesCooked !== 1 ? 's' : ''}`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={`Prep: ${recipe.prepTime}min`}
                    color="default"
                    size="small"
                  />
                  <Chip
                    label={`Cuisson: ${recipe.cookTime}min`}
                    color="default"
                    size="small"
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {recipe.description}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onSelectRecipe?.(recipe)}
                  fullWidth
                >
                  Voir la recette
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedRecipes.length === 0 && !loading && (
        <Typography color="text.secondary" align="center">
          Cliquez sur le bouton pour obtenir des suggestions de recettes
        </Typography>
      )}
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default RandomRecipe;
