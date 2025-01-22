import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
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
import { Timestamp } from 'firebase/firestore';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete }) => {
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
    <Card>
      <CardContent>
        {/* Badges en haut */}
        {/* Les badges indiquent le statut de la recette :
            - Badge "Végétarien" (vert) : apparaît uniquement si la recette est végétarienne
            - Badge "Réalisée" :
              - Gris avec contour : recette jamais réalisée (timesCooked = 0)
              - Bleu plein : recette réalisée au moins une fois (timesCooked > 0)
              - Le nombre sur le badge indique le nombre total de réalisations
        */}
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
          />
        </Box>

        {/* Titre et actions */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Box>
            <IconButton onClick={() => onEdit(recipe)} size="small" color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(recipe.id!)} size="small" color="error">
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

        {/* Historique des préparations */}
        {recipe.cookingHistory.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Historique des préparations:
            </Typography>
            <List dense>
              {recipe.cookingHistory.map((entry, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={formatDate(entry.date)}
                    secondary={entry.note}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
