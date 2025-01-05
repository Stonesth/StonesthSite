import React from 'react';
import { Container, Typography, Paper, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const energyData = [
  {
    name: 'Transaction Bancaire (Visa)',
    energie: 0.00169,
    couleur: '#2196f3',
  },
  {
    name: 'Blockchain PoS',
    energie: 0.01,
    couleur: '#4caf50',
  },
  {
    name: 'Bitcoin (PoW)',
    energie: 707,
    couleur: '#ff9800',
  },
];

const consommationAnnuelle = [
  {
    name: 'Système Bancaire',
    energie: 4981,
    couleur: '#2196f3',
  },
  {
    name: 'Bitcoin (PoW)',
    energie: 121,
    couleur: '#ff9800',
  },
  {
    name: 'Blockchain PoS',
    energie: 5,
    couleur: '#4caf50',
  },
];

const transactionsAnnuelles = [
  {
    name: 'Système Bancaire',
    transactions: 500,
  },
  {
    name: 'Bitcoin (PoW)',
    transactions: 0.35,
  },
  {
    name: 'Blockchain PoS',
    transactions: 500,
  },
];

const BlockchainEnergyAnalysis = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Date de publication : 23 décembre 2024
        </Typography>
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Analyse Détaillée : Consommation Énergétique des Systèmes Bancaires vs Blockchain
      </Typography>

      <StyledPaper elevation={3} sx={{ backgroundColor: '#fff3e0' }}>
        <Typography variant="h6" gutterBottom color="primary">
          Note Importante aux Lecteurs
        </Typography>
        <Typography paragraph>
          Cette analyse a été initialement générée avec l'aide d'une Intelligence Artificielle 
          (Perplexity) et est actuellement en cours de vérification approfondie. Bien que nous 
          nous efforcions de maintenir la plus grande précision possible, certaines informations 
          pourraient nécessiter des ajustements.
        </Typography>
        <Typography paragraph>
          Si vous constatez des inexactitudes ou souhaitez contribuer à l'amélioration de cette 
          analyse, nous vous invitons à nous contacter à l'adresse suivante :{' '}
          <Link 
            href="mailto:stonesth@gmx.fr" 
            sx={{ 
              textDecoration: 'none',
              color: 'primary.main',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            stonesth@gmx.fr
          </Link>
        </Typography>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          1. Vue d'ensemble
        </Typography>
        <Typography paragraph>
          Le débat sur l'efficacité énergétique des blockchains par rapport au système bancaire 
          traditionnel est complexe et nécessite une analyse approfondie. Voici une comparaison 
          détaillée entre les différentes technologies.
        </Typography>
      </StyledPaper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              2. Consommation Énergétique par Transaction
            </Typography>
            <Box sx={{ width: '100%', height: 300, mb: 3 }}>
              <ResponsiveContainer>
                <BarChart
                  data={energyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" scale="log" domain={['auto', 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="energie" name="Énergie (kWh)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="body1" paragraph>
              Le graphique ci-dessus montre la consommation énergétique par transaction pour 
              différents systèmes. La blockchain PoS se situe entre le système bancaire traditionnel 
              et Bitcoin, avec une consommation modérée.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              3. Volume de Transactions Annuelles (en milliards)
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={transactionsAnnuelles}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transactions" name="Transactions (milliards)" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="body1" paragraph>
              Les blockchains PoS peuvent gérer un volume de transactions comparable au système 
              bancaire, contrairement à Bitcoin qui est limité par sa technologie.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              4. Consommation Annuelle Globale
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={consommationAnnuelle}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" scale="log" domain={['auto', 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="energie" name="Énergie (TWh)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          5. Analyse Comparative Détaillée
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Critère</StyledTableCell>
                <StyledTableCell>Système bancaire</StyledTableCell>
                <StyledTableCell>Blockchain Proof of Stake (PoS)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Nombre de transactions annuelles</TableCell>
                <TableCell>500 milliards</TableCell>
                <TableCell>500 milliards</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Consommation par transaction</TableCell>
                <TableCell>~0,00169 kWh</TableCell>
                <TableCell>~0,001 à 0,01 kWh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Consommation annuelle pour 500 milliards de transactions</TableCell>
                <TableCell>845 GWh</TableCell>
                <TableCell>500 GWh à 5 TWh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Consommation annuelle globale (incluant infrastructures)</TableCell>
                <TableCell>~4 981 TWh</TableCell>
                <TableCell>~5 TWh</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          6. Exemples de Blockchains PoS Efficaces
        </Typography>
        <Typography variant="h6" gutterBottom>
          Cardano (ADA)
        </Typography>
        <Typography paragraph>
          • Protocole : Proof-of-Stake (PoS)
          • Consommation par transaction : ~0,5479 kWh
          • Consommation annuelle : ~6 GWh
        </Typography>

        <Typography variant="h6" gutterBottom>
          Ethereum 2.0
        </Typography>
        <Typography paragraph>
          • Protocole : Transition vers PoS
          • Réduction de 99,95% de la consommation après transition
          • Consommation comparable aux autres blockchains PoS
        </Typography>

        <Typography variant="h6" gutterBottom>
          Polygon (MATIC)
        </Typography>
        <Typography paragraph>
          • Protocole : PoS
          • Consommation annuelle : ~0,00079 TWh
          • Excellente efficacité énergétique
        </Typography>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          7. Conclusion
        </Typography>
        <Typography paragraph>
          L'analyse démontre que les blockchains PoS représentent une alternative viable et 
          écologique au système bancaire traditionnel. Bien que la consommation par transaction 
          soit légèrement plus élevée pour certaines blockchains PoS, la consommation globale 
          est significativement inférieure grâce à l'absence d'infrastructures physiques et à 
          l'efficacité du protocole de consensus.
        </Typography>
        <Typography paragraph>
          Les innovations continues dans le domaine des blockchains PoS, comme en témoigne la 
          transition d'Ethereum, suggèrent que l'efficacité énergétique continuera de s'améliorer, 
          rendant cette technologie encore plus attrayante pour l'avenir des transactions financières.
        </Typography>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Sources et Références
        </Typography>
        <Typography paragraph>
          Cette analyse est basée sur de nombreuses sources académiques, rapports institutionnels 
          et études sectorielles. Pour consulter l'ensemble des sources et comprendre notre 
          méthodologie, visitez notre{' '}
          <Link href="/blockchain-sources" sx={{ textDecoration: 'none' }}>
            page dédiée aux sources et références
          </Link>
          .
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default BlockchainEnergyAnalysis;
