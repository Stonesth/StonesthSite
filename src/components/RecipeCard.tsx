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
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Badge badgeContent={recipe.timesCooked} color="primary" max={999}>
            <Chip label="Réalisée" color="primary" />
          </Badge>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {recipe.description}
        </Typography>

        <Box display="flex" gap={1} mt={2} mb={2}>
          <Chip
            label={`Préparation: ${recipe.prepTime}`}
            variant="outlined"
            size="small"
          />
          <Chip
            label={`Cuisson: ${recipe.cookTime}`}
            variant="outlined"
            size="small"
          />
          <Chip
            label={`${recipe.servings} portions`}
            variant="outlined"
            size="small"
          />
        </Box>

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

      <CardActions>
        <IconButton onClick={() => onEdit(recipe)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(recipe.id!)} color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
