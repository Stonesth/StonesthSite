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
  ListItemButton,
  TextField,
  Box,
  Checkbox,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Recipe } from '../types/Recipe';
import { getAllRecipes } from '../services/recipeService';

interface AddRecipeDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (recipe: Recipe) => void;
}

const AddRecipeDialog: React.FC<AddRecipeDialogProps> = ({
  open,
  onClose,
  onAdd
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    onAdd(recipe);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '50vh',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>Ajouter une recette à la liste</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Rechercher une recette"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
            size={isMobile ? "medium" : "small"}
          />
        </Box>
        <List sx={{ 
          maxHeight: '50vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 1
        }}>
          {filteredRecipes.map((recipe) => (
            <ListItemButton
              key={recipe.id}
              onClick={() => handleAddRecipe(recipe)}
              sx={{ 
                borderBottom: '1px solid',
                borderColor: 'divider',
                py: isMobile ? 2 : 1
              }}
            >
              <ListItemText 
                primary={recipe.title}
                primaryTypographyProps={{
                  sx: { 
                    fontSize: isMobile ? '1rem' : 'inherit',
                    fontWeight: 'medium'
                  }
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} size={isMobile ? "large" : "medium"}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecipeDialog;
