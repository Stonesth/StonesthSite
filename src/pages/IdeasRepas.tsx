import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const IdeasRepas: React.FC = () => {
  const { currentUser } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Idées Repas
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenue dans votre espace culinaire personnel ! 
          Ici, vous pourrez bientôt gérer vos recettes et planifier vos repas.
        </Typography>
      </Paper>
    </Container>
  );
};

export default IdeasRepas;
