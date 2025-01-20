import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, CircularProgress, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const IdeasRepas: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
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
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          Dernière mise à jour : 20 janvier 2025
        </Typography>
      </Paper>
    </Container>
  );
};

export default IdeasRepas;
