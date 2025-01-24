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
  Chip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../contexts/AuthContext';
import { getAllRecipes } from '../services/recipeService';

interface RandomRecipeProps {
  onSelectRecipe?: (recipe: Recipe) => void;
}

interface FilterOptions {
  maxPrepTime: number;
  maxCookTime: number;
  isVegetarian: boolean;
  minTimesCooked: number;
  maxTimesCooked: number;
}

const RandomRecipe: React.FC<RandomRecipeProps> = ({ onSelectRecipe }) => {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrepTime: 60,
    maxCookTime: 60,
    isVegetarian: false,
    minTimesCooked: 0,
    maxTimesCooked: 100
  });

  useEffect(() => {
    loadRecipes();
  }, [currentUser]);

  const loadRecipes = async () => {
    if (!currentUser) return;
    try {
      const loadedRecipes = await getAllRecipes(currentUser.uid);
      setRecipes(loadedRecipes);
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

  const selectRandomRecipe = () => {
    setLoading(true);
    const filteredRecipes = filterRecipes(recipes);
    
    if (filteredRecipes.length === 0) {
      setSelectedRecipe(null);
      setLoading(false);
      return;
    }

    // Algorithme de sélection basé sur le nombre de réalisations
    const totalWeight = filteredRecipes.reduce((sum, recipe) => {
      const timesCooked = recipe.timesCooked || 0;
      // Moins une recette a été cuisinée, plus elle a de chances d'être sélectionnée
      return sum + (100 - Math.min(timesCooked, 99));
    }, 0);

    let random = Math.random() * totalWeight;
    let selected: Recipe | null = null;

    for (const recipe of filteredRecipes) {
      const timesCooked = recipe.timesCooked || 0;
      const weight = 100 - Math.min(timesCooked, 99);
      random -= weight;
      
      if (random <= 0) {
        selected = recipe;
        break;
      }
    }

    // Si aucune recette n'a été sélectionnée (cas rare), prendre la dernière
    if (!selected && filteredRecipes.length > 0) {
      selected = filteredRecipes[filteredRecipes.length - 1];
    }

    setTimeout(() => {
      setSelectedRecipe(selected);
      setLoading(false);
      if (selected && onSelectRecipe) {
        onSelectRecipe(selected);
      }
    }, 500); // Petit délai pour l'effet visuel
  };

  const handleFilterChange = (field: keyof FilterOptions, value: number | boolean) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Suggestion de Recette
      </Typography>

      {/* Filtres */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtres
          </Typography>
          <Stack spacing={2}>
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

      {/* Bouton de suggestion */}
      <Button
        variant="contained"
        color="primary"
        onClick={selectRandomRecipe}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
        fullWidth
        sx={{ mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Recherche...' : 'Suggérer une recette'}
      </Button>

      {/* Affichage de la recette sélectionnée */}
      {selectedRecipe && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedRecipe.title}
            </Typography>
            
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {selectedRecipe.isVegetarian && (
                <Chip label="Végétarien" color="success" size="small" />
              )}
              <Chip 
                label={`${selectedRecipe.timesCooked || 0} réalisation${selectedRecipe.timesCooked !== 1 ? 's' : ''}`}
                color="primary"
                size="small"
              />
              <Chip
                label={`Prep: ${selectedRecipe.prepTime}min`}
                color="default"
                size="small"
              />
              <Chip
                label={`Cuisson: ${selectedRecipe.cookTime}min`}
                color="default"
                size="small"
              />
            </Stack>

            <Typography variant="body2" color="text.secondary" paragraph>
              {selectedRecipe.description}
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => onSelectRecipe?.(selectedRecipe)}
              fullWidth
            >
              Voir la recette
            </Button>
          </CardContent>
        </Card>
      )}

      {!selectedRecipe && !loading && (
        <Typography color="text.secondary" align="center">
          Cliquez sur le bouton pour obtenir une suggestion de recette
        </Typography>
      )}
    </Box>
  );
};

export default RandomRecipe;
