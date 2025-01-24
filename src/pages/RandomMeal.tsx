import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import RandomRecipe from '../components/RandomRecipe';
import { Recipe } from '../types/Recipe';
import RecipeForm from '../components/RecipeForm';
import { useNavigate } from 'react-router-dom';

const RandomMeal: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSelectRecipe = (recipe: Recipe) => {
    // Rediriger vers la page des idées repas avec la recette sélectionnée
    navigate('/ideas-repas', { state: { selectedRecipe: recipe } });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <RandomRecipe onSelectRecipe={handleSelectRecipe} />
      </Box>
    </Container>
  );
};

export default RandomMeal;
