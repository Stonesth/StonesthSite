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

const Blockchain = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Analyse Comparative : Consommation Énergétique des Systèmes Bancaires vs Blockchain
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
        <Typography paragraph>
          Votre retour est précieux pour nous aider à maintenir la qualité et l'exactitude 
          de ces informations.
        </Typography>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Observation Clé
        </Typography>
        <Typography paragraph>
          Une analyse approfondie révèle qu'une transaction sur une blockchain Proof-of-Stake (PoS) 
          consomme environ 0,01 kWh, contre 0,00169 kWh pour une transaction bancaire classique. 
          Cette différence mérite une analyse plus détaillée pour comprendre les implications réelles.
        </Typography>
      </StyledPaper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              1. Consommation Énergétique par Transaction
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Critère</StyledTableCell>
                    <StyledTableCell>Système bancaire actuel (Visa)</StyledTableCell>
                    <StyledTableCell>Blockchain PoS (ex. Polygon, Tezos)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Consommation par transaction</strong></TableCell>
                    <TableCell>~0,00169 kWh</TableCell>
                    <TableCell>~0,01 kWh</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ width: '100%', height: 400, mb: 3 }}>
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
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Résultat : Une transaction sur une blockchain PoS consomme environ 6 fois plus d'énergie 
              qu'une transaction bancaire classique.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              2. Pourquoi le système bancaire semble plus économe par transaction ?
            </Typography>
            <Typography variant="h6" gutterBottom>
              Système Bancaire (Infrastructure Centralisée)
            </Typography>
            <Box component="ul">
              <Typography component="li">
                Transactions regroupées et traitées en masse dans des centres de données très efficaces
              </Typography>
              <Typography component="li">
                Pas besoin de mécanismes de consensus décentralisés
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Blockchains PoS
            </Typography>
            <Box component="ul">
              <Typography component="li">
                Mécanismes de validation décentralisés nécessaires
              </Typography>
              <Typography component="li">
                Infrastructure active en permanence pour la sécurité et la disponibilité
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              3. Consommation Annuelle Globale
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Critère</StyledTableCell>
                    <StyledTableCell>Système bancaire actuel</StyledTableCell>
                    <StyledTableCell>Blockchain PoS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Consommation annuelle (transactions uniquement)</strong></TableCell>
                    <TableCell>~845 GWh</TableCell>
                    <TableCell>~5 TWh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Consommation annuelle totale</strong></TableCell>
                    <TableCell>~4 981 TWh</TableCell>
                    <TableCell>~5 TWh</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ width: '100%', height: 400 }}>
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
          4. Synthèse : Quelle solution est la plus économe ?
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Par transaction
        </Typography>
        <Typography paragraph>
          Le système bancaire classique est actuellement plus économe (~0,00169 kWh vs ~0,01 kWh pour 
          une blockchain PoS), grâce à l'efficacité d'une infrastructure centralisée.
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          En globalité
        </Typography>
        <Typography paragraph>
          En migrant toutes les transactions mondiales vers une blockchain PoS, la consommation 
          resterait relativement faible (~5 TWh/an) comparée à la consommation totale du système 
          bancaire actuel (~4 981 TWh/an).
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Facteurs à considérer
        </Typography>
        <Box component="ul">
          <Typography component="li">
            Transparence et élimination des intermédiaires avec les blockchains PoS
          </Typography>
          <Typography component="li">
            Potentiel d'amélioration continue de l'efficacité des blockchains PoS
          </Typography>
          <Typography component="li">
            Absence de coûts énergétiques indirects dans les blockchains (agences physiques, transport)
          </Typography>
        </Box>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Conclusion
        </Typography>
        <Typography paragraph>
          Bien que le système bancaire centralisé soit plus performant par transaction aujourd'hui, 
          les blockchains PoS représentent une alternative viable à moyen terme. La migration 
          complète vers une blockchain PoS moderne, combinée à l'élimination des infrastructures 
          bancaires traditionnelles, pourrait conduire à une réduction significative de la 
          consommation énergétique globale.
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

export default Blockchain;
