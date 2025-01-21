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
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Recipe } from '../services/recipeService';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
  canEdit: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete, canEdit }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {recipe.title}
          </Typography>
          {canEdit && (
            <Box>
              <IconButton onClick={() => onEdit(recipe)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(recipe.id!)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          {recipe.description}
        </Typography>

        <Box display="flex" gap={1} mb={2}>
          <Chip
            icon={<AccessTimeIcon />}
            label={`Préparation: ${recipe.prepTime} min`}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`Cuisson: ${recipe.cookTime} min`}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<RestaurantIcon />}
            label={`${recipe.servings} portions`}
            variant="outlined"
            size="small"
          />
        </Box>

        <Button
          onClick={handleExpandClick}
          endIcon={<ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />}
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </Button>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ingrédients
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

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <List>
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}. ${instruction}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Dernière modification : {recipe.updatedAt.toLocaleDateString()}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
