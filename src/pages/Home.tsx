import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Bienvenue sur mon site
          </Typography>
          <Typography variant="body1" paragraph>
            Ce site est dédié au partage de mes intérêts dans les domaines de l'IA, 
            des LLM et de l'impression 3D.
          </Typography>
          <Typography variant="body1">
            Explorez les différentes sections pour en apprendre davantage !
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
