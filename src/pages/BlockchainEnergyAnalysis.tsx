import React from 'react';
import { Container, Typography, Paper, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
];

const consommationAnnuelle = [
  {
    name: 'Système Bancaire (Total)',
    energie: 4981,
    couleur: '#2196f3',
  },
  {
    name: 'Système Bancaire (Transactions)',
    energie: 0.845,
    couleur: '#90caf9',
  },
  {
    name: 'Blockchain PoS (500B tx)',
    energie: 5,
    couleur: '#4caf50',
  },
];

const BlockchainEnergyAnalysis = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
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
          Comparaison Détaillée des Systèmes
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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Consommation Énergétique par Transaction
            </Typography>
            <Box sx={{ width: '100%', height: 300, mb: 3 }}>
              <ResponsiveContainer>
                <BarChart
                  data={energyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="energie" name="Énergie (kWh)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Consommation Annuelle Globale
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
          Analyse des Résultats
        </Typography>
        <Typography paragraph>
          Pour le même nombre de transactions (500 milliards), la blockchain PoS démontre une 
          efficacité énergétique remarquable, particulièrement lorsqu'on considère la consommation 
          globale incluant toutes les infrastructures. L'absence d'infrastructures physiques comme 
          les agences bancaires représente un avantage significatif en termes d'économie d'énergie.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Points Clés
        </Typography>
        <Box component="ul">
          <Typography component="li">
            La consommation par transaction est comparable entre les deux systèmes
          </Typography>
          <Typography component="li">
            L'élimination des infrastructures physiques dans le système PoS permet une réduction 
            drastique de la consommation globale
          </Typography>
        </Box>
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
