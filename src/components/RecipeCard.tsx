import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge
} from '@mui/material';
import { Recipe } from '../types/Recipe';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Timestamp } from 'firebase/firestore';
import CookingHistory from './CookingHistory';
import { incrementTimesCooked } from '../services/recipeService';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onUpdate?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete, onUpdate }) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleAddEntry = async (note: string) => {
    if (!recipe.id) return;
    await incrementTimesCooked(recipe.id, note);
    if (onUpdate) onUpdate();
  };

  const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          {/* Badges en haut */}
          <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1} mb={2}>
            {recipe.isVegetarian && (
              <Chip
                icon={<RestaurantIcon />}
                label="Végétarien"
                color="success"
                size="small"
              />
            )}
            <Chip
              icon={<Badge badgeContent={recipe.timesCooked} color={recipe.timesCooked > 0 ? "primary" : "default"} max={99} />}
              label="Réalisée"
              color={recipe.timesCooked > 0 ? "primary" : "default"}
              variant={recipe.timesCooked > 0 ? "filled" : "outlined"}
              size="small"
              onClick={() => setShowHistory(true)}
            />
          </Box>

          {/* Titre et actions */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h5" component="div">
              {recipe.title}
            </Typography>
            <Box>
              <IconButton onClick={() => setShowHistory(true)} size="small" color="primary" title="Voir l'historique">
                <HistoryIcon />
              </IconButton>
              <IconButton onClick={() => onEdit(recipe)} size="small" color="primary" title="Modifier">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(recipe.id!)} size="small" color="error" title="Supprimer">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" paragraph>
            {recipe.description}
          </Typography>

          {/* Temps de préparation et cuisson */}
          <Box display="flex" gap={2} mb={2}>
            <Typography variant="body2">
              Préparation : {recipe.prepTime}min
            </Typography>
            <Typography variant="body2">
              Cuisson : {recipe.cookTime}min
            </Typography>
          </Box>

          {/* Ingrédients */}
          <Typography variant="subtitle2" gutterBottom>
            Ingrédients:
          </Typography>
          <List dense>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                />
              </ListItem>
            ))}
          </List>

          {/* Instructions */}
          <Typography variant="subtitle2" gutterBottom>
            Instructions:
          </Typography>
          <List dense>
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}. ${instruction}`}
                />
              </ListItem>
            ))}
          </List>

          {/* Actions en bas */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={() => window.location.href = '/shopping-lists?addRecipe=' + recipe.id}
            >
              Ajouter aux courses
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircleIcon />}
              onClick={() => setShowHistory(true)}
            >
              Marquer comme réalisée
            </Button>
          </Box>
        </CardContent>
      </Card>

      <CookingHistory
        open={showHistory}
        onClose={() => setShowHistory(false)}
        recipe={recipe}
        onAddEntry={handleAddEntry}
      />
    </>
  );
};

export default RecipeCard;
