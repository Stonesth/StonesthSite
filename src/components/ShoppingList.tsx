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
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ShoppingList as ShoppingListType, ShoppingListIngredient } from '../types/ShoppingList';
import { updateRecipeServings, removeRecipeFromList, updateIngredientStatus, addRecipeToList } from '../services/shoppingListService';
import { Recipe } from '../types/Recipe';
import AddRecipeDialog from './AddRecipeDialog';

interface ShoppingListProps {
  shoppingList: ShoppingListType;
  onUpdate: () => Promise<void>;
  onDelete: () => Promise<void>;
  onBack?: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  shoppingList,
  onUpdate,
  onDelete,
  onBack
}) => {
  const [servings, setServings] = useState<{ [key: string]: string }>({});
  const [addRecipeDialogOpen, setAddRecipeDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const newServings: { [key: string]: string } = {};
    shoppingList.recipes?.forEach(recipe => {
      newServings[recipe.recipeId] = recipe.servings;
    });
    setServings(newServings);
  }, [shoppingList]);

  const handleServingsChange = async (recipeId: string, newServings: number) => {
    if (!shoppingList.id || !shoppingList.recipes) return;

    const recipe = shoppingList.recipes.find(r => r.recipeId === recipeId);
    if (!recipe || newServings < 1) return;

    try {
      await updateRecipeServings(
        shoppingList.id,
        recipeId,
        newServings,
        parseInt(recipe.originalServings)
      );
      setServings(prev => ({
        ...prev,
        [recipeId]: newServings.toString()
      }));
      await onUpdate();
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

  const handleAddRecipe = async (recipe: Recipe) => {
    if (!shoppingList.id) return;
    
    try {
      await addRecipeToList(shoppingList.id, recipe);
      await onUpdate();
    } catch (error) {
      console.error('Error adding recipe:', error);
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
    <Box sx={{ px: isMobile ? 1 : 2 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'stretch' : 'center', 
        gap: 2,
        mb: 3 
      }}>
        <Button
          fullWidth={isMobile}
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="outlined"
          size={isMobile ? "large" : "medium"}
        >
          Retour
        </Button>
        <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ width: isMobile ? '100%' : 'auto' }}>
          <Button
            fullWidth={isMobile}
            startIcon={<AddIcon />}
            onClick={() => setAddRecipeDialogOpen(true)}
            variant="contained"
            size={isMobile ? "large" : "medium"}
          >
            Ajouter une recette
          </Button>
          <Button
            fullWidth={isMobile}
            color="error"
            variant="contained"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
            size={isMobile ? "large" : "medium"}
          >
            Supprimer la liste
          </Button>
        </Stack>
      </Box>

      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: isMobile ? 'center' : 'left' }}>
        {shoppingList.name}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Recettes
      </Typography>
      
      {shoppingList.recipes.map((recipe) => (
        <Paper 
          key={recipe.recipeId} 
          sx={{ 
            mb: 2, 
            p: 2
          }}
        >
          <Box 
            display="flex" 
            flexDirection={isMobile ? 'column' : 'row'} 
            alignItems={isMobile ? 'stretch' : 'center'} 
            gap={isMobile ? 2 : 0}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                flex: 1,
                mb: isMobile ? 1 : 0,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {recipe.title}
            </Typography>
            <Box 
              display="flex" 
              alignItems="center"
              justifyContent={isMobile ? 'space-between' : 'flex-end'}
              width={isMobile ? '100%' : 'auto'}
              gap={1}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 0.5
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleServingsChange(
                    recipe.recipeId,
                    parseInt(servings[recipe.recipeId] || recipe.servings) - 1
                  )}
                  disabled={parseInt(servings[recipe.recipeId] || recipe.servings) <= 1}
                >
                  <RemoveIcon fontSize={isMobile ? "medium" : "small"} />
                </IconButton>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    minWidth: '40px',
                    textAlign: 'center',
                    userSelect: 'none'
                  }}
                >
                  {servings[recipe.recipeId] || recipe.servings}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleServingsChange(
                    recipe.recipeId,
                    parseInt(servings[recipe.recipeId] || recipe.servings) + 1
                  )}
                >
                  <AddIcon fontSize={isMobile ? "medium" : "small"} />
                </IconButton>
              </Box>
              <IconButton
                color="error"
                onClick={() => handleRemoveRecipe(recipe.recipeId)}
                size={isMobile ? "medium" : "small"}
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

      <List sx={{ 
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        '& .MuiListItem-root': {
          px: isMobile ? 1 : 2,
          py: isMobile ? 2 : 1
        }
      }}>
        {shoppingList.ingredients.map((item: ShoppingListIngredient, index: number) => (
          <ListItem
            key={`${item.recipes.join('-')}-${item.name}-${index}`}
            sx={{
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <ListItemText
              primary={
                <Typography 
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ 
                    mb: isMobile ? 1 : 0,
                    textAlign: isMobile ? 'center' : 'left',
                    textDecoration: item.checked ? 'line-through' : 'none'
                  }}
                >
                  {`${item.name} - ${typeof item.quantity === 'number' ? item.quantity.toFixed(2) : Number(item.quantity).toFixed(2)} ${item.unit}`}
                </Typography>
              }
              secondary={
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    textAlign: isMobile ? 'center' : 'left'
                  }}
                >
                  Recettes : {shoppingList.recipes
                    .filter(recipe => item.recipes.includes(recipe.recipeId))
                    .map(recipe => recipe.title)
                    .join(', ')}
                </Typography>
              }
            />
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-end',
                mt: isMobile ? 1 : 0
              }}
            >
              <Checkbox
                edge="end"
                checked={item.checked}
                onChange={() => handleToggleItem(index)}
                size={isMobile ? "large" : "medium"}
              />
            </Box>
          </ListItem>
        ))}
      </List>

      <AddRecipeDialog
        open={addRecipeDialogOpen}
        onClose={() => setAddRecipeDialogOpen(false)}
        onAdd={handleAddRecipe}
      />
    </Box>
  );
};

export default ShoppingList;
