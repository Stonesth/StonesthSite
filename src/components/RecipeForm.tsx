import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Recipe, Ingredient } from '../types/Recipe';
import { useAuth } from '../contexts/AuthContext';

interface RecipeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (recipe: Omit<Recipe, 'id' | 'timesCooked' | 'cookingHistory' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Recipe;
}

interface RecipeFormData {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
  isVegetarian: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [{ name: '', quantity: 0, unit: '' }],
    instructions: [''],
    isVegetarian: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        prepTime: initialData.prepTime || '',
        cookTime: initialData.cookTime || '',
        servings: initialData.servings || '',
        ingredients: initialData.ingredients || [{ name: '', quantity: 0, unit: '' }],
        instructions: initialData.instructions || [''],
        isVegetarian: initialData.isVegetarian || false
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    setFormData(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: field === 'quantity' ? Number(value) : value
      };
      return {
        ...prev,
        ingredients: newIngredients
      };
    });
  };

  const handleAddIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: 0, unit: '' }]
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    setFormData(prev => {
      const newInstructions = [...prev.instructions];
      newInstructions[index] = value;
      return {
        ...prev,
        instructions: newInstructions
      };
    });
  };

  const handleAddInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const handleRemoveInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleIsVegetarianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isVegetarian: e.target.checked
    }));
  };

  const handleSubmit = () => {
    if (!currentUser) return;
    onSubmit({
      ...formData,
      userId: currentUser.uid,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Modifier la recette' : 'Nouvelle recette'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <TextField
              label="Temps de préparation"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Temps de cuisson"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Nombre de portions"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              margin="normal"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isVegetarian}
                  onChange={handleIsVegetarianChange}
                  color="primary"
                />
              }
              label="Recette végétarienne"
            />
          </Box>

          <Box mt={3}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <h3>Ingrédients</h3>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddIngredient}
                variant="outlined"
                size="small"
              >
                Ajouter un ingrédient
              </Button>
            </Box>
            <List>
              {formData.ingredients.map((ingredient, index) => (
                <ListItem key={index} dense>
                  <Box display="flex" gap={2} width="100%">
                    <TextField
                      label="Quantité"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      type="number"
                      size="small"
                    />
                    <TextField
                      label="Unité"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      size="small"
                    />
                    <TextField
                      label="Ingrédient"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveIngredient(index)}
                      disabled={formData.ingredients.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box mt={3}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <h3>Instructions</h3>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddInstruction}
                variant="outlined"
                size="small"
              >
                Ajouter une instruction
              </Button>
            </Box>
            <List>
              {formData.instructions.map((instruction, index) => (
                <ListItem key={index} dense>
                  <TextField
                    fullWidth
                    multiline
                    label={`Étape ${index + 1}`}
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveInstruction(index)}
                      disabled={formData.instructions.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? 'Modifier' : 'Créer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeForm;
