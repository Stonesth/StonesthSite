import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';

const AIExperts = () => {
  const experts = [
    {
      name: "Expert 1",
      domain: "Large Language Models",
      description: "Spécialiste des modèles de langage et de leur application."
    },
    // Ajoutez d'autres experts ici
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Experts en IA et LLM
        </Typography>
        <Grid container spacing={3}>
          {experts.map((expert, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {expert.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {expert.domain}
                  </Typography>
                  <Typography variant="body2">
                    {expert.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AIExperts;
