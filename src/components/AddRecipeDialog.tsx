import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Checkbox
} from '@mui/material';
import { Recipe } from '../types/Recipe';
import { getAllRecipes } from '../services/recipeService';

interface AddRecipeDialogProps {
  open: boolean;
  onClose: () => void;
  onAddRecipe: (recipe: Recipe) => void;
}

const AddRecipeDialog: React.FC<AddRecipeDialogProps> = ({
  open,
  onClose,
  onAddRecipe
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipesData = await getAllRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadRecipes();
    }
  }, [open]);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecipe = (recipe: Recipe) => {
    onAddRecipe(recipe);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter une recette à la liste</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Rechercher une recette"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
          />
        </Box>
        <List>
          {filteredRecipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              button
              onClick={() => handleAddRecipe(recipe)}
            >
              <ListItemText primary={recipe.title} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecipeDialog;
