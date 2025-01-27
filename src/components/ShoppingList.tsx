import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Checkbox,
  TextField,
  Paper,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ShoppingList as ShoppingListType, ShoppingListIngredient } from '../types/ShoppingList';
import { updateRecipeServings, removeRecipeFromList, updateIngredientStatus } from '../services/shoppingListService';

interface ShoppingListProps {
  shoppingList: ShoppingListType;
  onUpdate: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  shoppingList,
  onUpdate,
  onDelete,
  onBack
}) => {
  const [servings, setServings] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newServings: { [key: string]: string } = {};
    shoppingList.recipes?.forEach(recipe => {
      newServings[recipe.recipeId] = recipe.servings;
    });
    setServings(newServings);
  }, [shoppingList]);

  const handleServingsChange = async (recipeId: string, newServings: string) => {
    if (!shoppingList.id || !shoppingList.recipes) return;

    const recipe = shoppingList.recipes.find(r => r.recipeId === recipeId);
    if (!recipe) return;

    try {
      await updateRecipeServings(
        shoppingList.id,
        recipeId,
        parseInt(newServings),
        parseInt(recipe.originalServings) // Utiliser originalServings pour le calcul du ratio
      );
      setServings(prev => ({
        ...prev,
        [recipeId]: newServings
      }));
      onUpdate(); // Appeler onUpdate pour rafraîchir les données
    } catch (error) {
      console.error('Error updating servings:', error);
    }
  };

  const handleRemoveRecipe = async (recipeId: string) => {
    if (!shoppingList.id) return;
    
    try {
      await removeRecipeFromList(shoppingList.id, recipeId);
      await onUpdate();
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const handleToggleItem = async (itemIndex: number) => {
    if (!shoppingList.id || !shoppingList.ingredients) return;

    try {
      const updatedItems = shoppingList.ingredients.map((item, index) =>
        index === itemIndex ? { ...item, checked: !item.checked } : item
      );
      await updateIngredientStatus(shoppingList.id, updatedItems);
      await onUpdate();
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  };

  if (!shoppingList.recipes || !shoppingList.ingredients) {
    return (
      <Box>
        <Typography>Erreur : Données de la liste invalides</Typography>
        <Button onClick={onBack}>Retour</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h2">
          {shoppingList.name}
        </Typography>
        <Box flexGrow={1} />
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Supprimer la liste
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Recettes
      </Typography>
      
      {shoppingList.recipes.map((recipe) => (
        <Paper key={recipe.recipeId} sx={{ mb: 2, p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{recipe.title}</Typography>
            <Box display="flex" alignItems="center">
              <TextField
                type="number"
                label="Portions"
                value={servings[recipe.recipeId] || recipe.servings}
                onChange={(e) => {
                  const newServings = e.target.value;
                  if (parseInt(newServings) > 0) {
                    handleServingsChange(recipe.recipeId, newServings);
                  }
                }}
                size="small"
                sx={{ width: 100, mr: 2 }}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveRecipe(recipe.recipeId)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Ingrédients
      </Typography>

      <List>
        {shoppingList.ingredients.map((item: ShoppingListIngredient, index: number) => (
          <ListItem
            key={`${item.recipes.join('-')}-${item.name}-${index}`}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={item.checked}
                onChange={() => handleToggleItem(index)}
              />
            }
          >
            <ListItemText
              primary={`${item.name} - ${item.quantity.toFixed(2)} ${item.unit}`}
              secondary={`Pour : ${shoppingList.recipes
                .filter(recipe => item.recipes.includes(recipe.recipeId))
                .map(recipe => recipe.title)
                .join(', ')}`}
              sx={{
                textDecoration: item.checked ? 'line-through' : 'none',
                color: item.checked ? 'text.disabled' : 'text.primary'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ShoppingList;
