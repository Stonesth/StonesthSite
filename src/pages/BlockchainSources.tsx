import React from 'react';
import { Container, Typography, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

interface Source {
  url: string;
  description: string;
}

const sourcesByCategory = {
  systemeBancaire: {
    title: "Système Bancaire et Consommation Énergétique",
    sources: [
      {
        url: "https://www.cssf.lu/fr/2024/04/evolution-de-la-situation-bancaire-sur-les-dernieres-annees/",
        description: "Évolution de la situation bancaire sur les dernières années - CSSF"
      },
      {
        url: "https://www.construction21.org/belgique/articles/h/7-defis-de-gestion-de-l-energie-dans-le-secteur-bancaire.html",
        description: "Les défis de la gestion énergétique dans le secteur bancaire"
      },
      {
        url: "https://febelfin.be/media/pages/publicaties/2024/jaarverslag-febelfin-2023/e0e29e39fe-1718022470/febelfin_rapport_annuel_2023.pdf",
        description: "Rapport annuel Febelfin 2023 - Secteur bancaire belge"
      },
      {
        url: "https://www.nbb.be/doc/ts/publications/nbbreport/2023/fr/t1/rapport2023_tii_h7.pdf",
        description: "Rapport BNB 2023 - Analyse du secteur bancaire"
      }
    ]
  },
  comparaisonEnergetique: {
    title: "Comparaisons Énergétiques Blockchain vs Banques",
    sources: [
      {
        url: "https://www.sia-partners.com/fr/publications/publications-de-nos-experts/analyse-la-consommation-energetique-du-bitcoin",
        description: "Analyse détaillée de la consommation énergétique du Bitcoin"
      },
      {
        url: "https://ecobusinesspro.com/blockchain-vs-banque",
        description: "Comparaison approfondie entre blockchain et banques traditionnelles"
      },
      {
        url: "https://www.cointribune.com/le-systeme-bancaire-consomme-56-fois-plus-denergie-que-le-bitcoin-btc/",
        description: "Étude comparative de la consommation énergétique"
      },
      {
        url: "https://www.adan.eu/publication/les-protocoles-blockchain-et-leur-empreinte-energetique/",
        description: "Analyse détaillée de l'empreinte énergétique des protocoles blockchain"
      }
    ]
  },
  statistiquesTransactions: {
    title: "Statistiques et Données Transactionnelles",
    sources: [
      {
        url: "https://fr.statista.com/infographie/32280/neobanques-evolution-nombre-de-clients-et-valeur-des-transactions/",
        description: "Évolution des néobanques et volume transactionnel"
      },
      {
        url: "https://fr.statista.com/statistiques/488638/nombre-paiements-monnaie-electronique-france/",
        description: "Statistiques des paiements électroniques en France"
      }
    ]
  },
  proofOfStake: {
    title: "Proof of Stake et Innovations Blockchain",
    sources: [
      {
        url: "https://www.capital.fr/crypto/cryptomonnaies-quelles-sont-les-blockchains-les-plus-ecologiques-1438789",
        description: "Les blockchains les plus écologiques"
      },
      {
        url: "https://mpost.io/fr/energy-proof-of-work-vs-proof-of-stake-blockchains/",
        description: "Comparaison énergétique PoW vs PoS"
      },
      {
        url: "https://coinacademy.fr/academie/ethereum-proof-of-stake-pos-tout-savoir/",
        description: "Guide complet sur le Proof of Stake d'Ethereum"
      },
      {
        url: "https://www.numerama.com/tech/713345-lethereum-passe-a-la-proof-of-stake-tout-comprendre-a-cette-revolution-dans-les-cryptomonnaies.html",
        description: "La révolution du passage d'Ethereum au PoS"
      }
    ]
  },
  etudesScientifiques: {
    title: "Études et Analyses Scientifiques",
    sources: [
      {
        url: "https://ecoinfo.cnrs.fr/2021/11/05/consommation-energetique-des-technologies-blockchain/",
        description: "Étude CNRS sur la consommation énergétique des blockchains"
      },
      {
        url: "https://www.polytechnique-insights.com/tribunes/energie/bitcoin-une-consommation-electrique-comparable-a-celle-de-la-pologne/",
        description: "Analyse comparative de la consommation électrique du Bitcoin"
      }
    ]
  }
};

const BlockchainSources = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Sources et Références - Analyse Énergétique Blockchain vs Banques
      </Typography>

      <StyledPaper elevation={3}>
        <Typography paragraph>
          Cette page regroupe l'ensemble des sources utilisées pour notre analyse comparative 
          de la consommation énergétique entre les systèmes bancaires traditionnels et les 
          blockchains. Les sources sont organisées par thématique pour faciliter la navigation 
          et la vérification des informations.
        </Typography>
      </StyledPaper>

      {Object.entries(sourcesByCategory).map(([key, category]) => (
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{category.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              {category.sources.map((source, index) => (
                <Box component="li" key={index} sx={{ mb: 2 }}>
                  <Link 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ display: 'block', mb: 0.5 }}
                  >
                    {source.description}
                  </Link>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <StyledPaper elevation={3} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Note sur la Méthodologie
        </Typography>
        <Typography paragraph>
          Les données présentées dans notre analyse sont issues de ces différentes sources, 
          croisées et vérifiées pour assurer la plus grande précision possible. Les chiffres 
          peuvent varier selon les études et les méthodologies employées. Nous avons privilégié 
          les sources les plus récentes et les plus fiables, en particulier les publications 
          d'institutions reconnues et les études scientifiques.
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default BlockchainSources;
