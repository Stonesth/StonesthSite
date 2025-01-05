import React from 'react';
import { Container, Typography, Card, CardContent, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Resources: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ressources & Conseils
      </Typography>
      <Typography variant="body1" paragraph>
        Cette section regroupe des articles et conseils sur divers sujets technologiques.
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" component={RouterLink} to="/resources/microsoft-office" 
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
            Microsoft Office : quelle solution choisir ?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Un guide pour vous aider à choisir la meilleure solution Microsoft Office selon vos besoins.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Resources;
