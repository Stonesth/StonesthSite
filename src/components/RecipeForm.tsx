import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Recipe } from '../services/recipeService';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface RecipeFormData {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
}

interface RecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  initialRecipe?: Recipe | null;
}

const initialFormData: RecipeFormData = {
  title: '',
  description: '',
  prepTime: '',
  cookTime: '',
  servings: '',
  ingredients: [],
  instructions: [],
};

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, initialRecipe }) => {
  const [formData, setFormData] = useState<RecipeFormData>(
    initialRecipe ? {
      title: initialRecipe.title,
      description: initialRecipe.description,
      prepTime: initialRecipe.prepTime,
      cookTime: initialRecipe.cookTime,
      servings: initialRecipe.servings,
      ingredients: initialRecipe.ingredients,
      instructions: initialRecipe.instructions,
    } : initialFormData
  );
  const [newIngredient, setNewIngredient] = useState<Ingredient>({ name: '', quantity: '', unit: '' });
  const [newInstruction, setNewInstruction] = useState('');

  useEffect(() => {
    if (initialRecipe) {
      setFormData({
        title: initialRecipe.title,
        description: initialRecipe.description,
        prepTime: initialRecipe.prepTime,
        cookTime: initialRecipe.cookTime,
        servings: initialRecipe.servings,
        ingredients: initialRecipe.ingredients,
        instructions: initialRecipe.instructions,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [initialRecipe]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient],
      }));
      setNewIngredient({ name: '', quantity: '', unit: '' });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, newInstruction.trim()],
      }));
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {initialRecipe ? 'Modifier la recette' : 'Nouvelle Recette'}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Titre de la recette"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Temps de préparation (min)"
              name="prepTime"
              type="number"
              value={formData.prepTime}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Temps de cuisson (min)"
              name="cookTime"
              type="number"
              value={formData.cookTime}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nombre de portions"
              name="servings"
              type="number"
              value={formData.servings}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Ingrédients
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Ingrédient"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              />
              <TextField
                label="Quantité"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
              />
              <TextField
                label="Unité"
                value={newIngredient.unit}
                onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
              />
              <IconButton onClick={handleAddIngredient} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {formData.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemoveIngredient(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Instructions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                multiline
                label="Étape"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
              />
              <IconButton onClick={handleAddInstruction} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {formData.instructions.map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={`${index + 1}. ${instruction}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemoveInstruction(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              {initialRecipe ? 'Mettre à jour' : 'Enregistrer la recette'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default RecipeForm;
