import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';

const ThreeDPrinting = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Impression 3D
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Mes Projets d'Impression 3D
                </Typography>
                <Typography variant="body1" paragraph>
                  Cette section contiendra des informations sur mes projets d'impression 3D,
                  les modèles utilisés, et les techniques employées.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ThreeDPrinting;
