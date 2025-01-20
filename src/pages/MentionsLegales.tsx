import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const MentionsLegales: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mentions Légales
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Éditeur du site
          </Typography>
          <Typography paragraph>
            Ce site est édité par MonSite.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Hébergement
          </Typography>
          <Typography paragraph>
            Ce site est hébergé par Firebase (Google Cloud Platform).
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Propriété intellectuelle
          </Typography>
          <Typography paragraph>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Protection des données personnelles
          </Typography>
          <Typography paragraph>
            Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MentionsLegales;
