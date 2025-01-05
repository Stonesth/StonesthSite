import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const Blockchain = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Date de publication : 23 décembre 2024
        </Typography>
      </Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Blockchain (PoS) vs Système Bancaire
      </Typography>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Analyse Comparative de la Consommation Énergétique
        </Typography>
        <Typography paragraph>
          Découvrez notre analyse approfondie comparant l'efficacité énergétique des systèmes 
          bancaires traditionnels avec les blockchains modernes utilisant le Proof of Stake (PoS).
        </Typography>
        <Typography paragraph>
          Cette étude examine en détail les consommations par transaction, les impacts 
          environnementaux et les avantages de chaque système.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to="/blockchain-energy-analysis"
            variant="contained"
            size="large"
            startIcon={<BarChartIcon />}
            sx={{ mt: 2 }}
          >
            Voir l'Analyse Détaillée
          </Button>
        </Box>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Points Clés de l'Analyse
        </Typography>
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: 600, margin: '0 auto' }}>
          <Typography component="ul">
            <Typography component="li" sx={{ mb: 1 }}>
              Comparaison des consommations énergétiques par transaction
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Impact des infrastructures physiques sur la consommation globale
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Analyse des coûts énergétiques des agences bancaires
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Perspectives d'avenir et potentiel d'amélioration
            </Typography>
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Blockchain;
