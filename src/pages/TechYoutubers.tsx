import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Link,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`youtuber-tabpanel-${index}`}
      aria-labelledby={`youtuber-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const youtubers = {
  francophone: [
    {
      name: "Léo Duff",
      url: "https://www.youtube.com/@LeoDuff",
      channelId: "@LeoDuff",
      description: "Développeur passionné partageant son expertise en développement web et nouvelles technologies.",
      categories: ["Dev Web", "Tech News"],
      favorite: true
    },
    {
      name: "Johan Solutions Digitales",
      url: "https://www.youtube.com/@johansolutionsdigitales",
      channelId: "@johansolutionsdigitales",
      description: "Solutions digitales et automatisation pour entrepreneurs et développeurs.",
      categories: ["Automatisation", "Solutions Digitales"],
      favorite: true
    },
    {
      name: "Underscore_",
      url: "https://www.youtube.com/@Underscore_",
      channelId: "@Underscore_",
      description: "Contenu tech de qualité avec une approche pédagogique.",
      categories: ["Tech", "Tutoriels"],
      favorite: true
    },
    {
      name: "Yass-IA",
      url: "https://www.youtube.com/@Yass-IA",
      channelId: "@Yass-IA",
      description: "Actualités et tutoriels sur l'intelligence artificielle.",
      categories: ["IA"]
    },
    {
      name: "No Code Skills",
      url: "https://www.youtube.com/@nocodeskills",
      channelId: "@nocodeskills",
      description: "Solutions sans code pour créer des applications.",
      categories: ["No Code"]
    },
    {
      name: "Explor_IA",
      url: "https://www.youtube.com/@Explor_IA",
      channelId: "@Explor_IA",
      description: "Exploration des possibilités de l'IA.",
      categories: ["IA"]
    },
    {
      name: "ICI Amy Plant",
      url: "https://www.youtube.com/@iciamyplant",
      channelId: "@iciamyplant",
      description: "Contenus sur l'IA et ses applications.",
      categories: ["IA"]
    },
    {
      name: "Code Rocks",
      url: "https://www.youtube.com/@CodeRocks",
      channelId: "@CodeRocks",
      description: "Tutoriels de programmation et bonnes pratiques.",
      categories: ["Dev", "Tutoriels"]
    },
    {
      name: "Pierrick Chevallier",
      url: "https://www.youtube.com/@pierrickchevallier",
      channelId: "@pierrickchevallier",
      description: "Contenu tech et développement.",
      categories: ["Tech", "Dev"]
    },
    {
      name: "Ludovic Salenne",
      url: "https://www.youtube.com/@LudovicSalenne",
      channelId: "@LudovicSalenne",
      description: "Formation et tutoriels en développement.",
      categories: ["Dev", "Formation"]
    },
    {
      name: "Code Concept",
      url: "https://www.youtube.com/@codeconcept",
      channelId: "@codeconcept",
      description: "Concepts de programmation et tutoriels.",
      categories: ["Dev", "Tutoriels"]
    },
    {
      name: "Elliott Pierret",
      url: "https://www.youtube.com/@elliottpierret",
      channelId: "@elliottpierret",
      description: "Tech et développement.",
      categories: ["Tech", "Dev"]
    },
    {
      name: "Code and Bird",
      url: "https://www.youtube.com/@codeandbird",
      channelId: "@codeandbird",
      description: "Programmation et développement.",
      categories: ["Dev"]
    },
    {
      name: "Underground IA",
      url: "https://www.youtube.com/@UndergroundIA",
      channelId: "@UndergroundIA",
      description: "Actualités et analyses sur l'IA.",
      categories: ["IA"]
    },
    {
      name: "AI Warehouse",
      url: "https://www.youtube.com/@aiwarehouse",
      channelId: "@aiwarehouse",
      description: "Ressources et actualités IA.",
      categories: ["IA"]
    },
    {
      name: "AI Lixyr",
      url: "https://www.youtube.com/@AiLixyr",
      channelId: "@AiLixyr",
      description: "Contenu sur l'intelligence artificielle.",
      categories: ["IA"]
    }
  ],
  anglophone: [
    {
      name: "AI for Devs",
      url: "https://www.youtube.com/@ai-for-devs",
      channelId: "@ai-for-devs",
      description: "Intelligence artificielle pour les développeurs.",
      categories: ["IA", "Dev"],
      favorite: true
    },
    {
      name: "Tech With Tim",
      url: "https://www.youtube.com/@TechWithTim",
      channelId: "@TechWithTim",
      description: "Tutoriels de programmation et projets pratiques.",
      categories: ["Dev", "Tutoriels"],
      favorite: true
    },
    {
      name: "Digital Success AI",
      url: "https://www.youtube.com/@DigitalSuccessAI",
      channelId: "@DigitalSuccessAI",
      description: "Stratégies et succès avec l'IA.",
      categories: ["IA", "Business"]
    },
    {
      name: "Shubham Sharma",
      url: "https://www.youtube.com/@Shubham_Sharma",
      channelId: "@Shubham_Sharma",
      description: "Tutoriels tech et développement.",
      categories: ["Tech", "Dev"]
    }
  ]
};

const TechYoutubers = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=200&bold=true&font-size=0.5`;
  };

  const renderYoutuberCard = (youtuber: any) => (
    <Grid item xs={12} sm={6} md={4} key={youtuber.name}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.2s ease-in-out',
            boxShadow: 6
          }
        }}
      >
        {youtuber.favorite && (
          <Chip
            label="Favori"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1
            }}
          />
        )}
        <Link
          href={youtuber.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardMedia
            component="img"
            sx={{
              height: 176,
              width: 176,
              margin: '16px auto',
              borderRadius: '50%',
              border: '3px solid',
              borderColor: 'primary.main',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            image={getAvatarUrl(youtuber.name)}
            alt={`${youtuber.name} avatar`}
          />
        </Link>
        <CardContent sx={{ flexGrow: 1 }}>
          <Link
            href={youtuber.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography 
              gutterBottom 
              variant="h6" 
              component="h2" 
              align="center"
              sx={{
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {youtuber.name}
            </Typography>
          </Link>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph 
            align="center"
          >
            {youtuber.description}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 0.5, 
            justifyContent: 'center' 
          }}>
            {youtuber.categories.map((category: string) => (
              <Chip
                key={category}
                label={category}
                size="small"
                sx={{ 
                  backgroundColor: category === 'IA' ? 'primary.light' : 
                               category === 'Dev' ? 'secondary.light' : 
                               'default'
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        YouTubeurs Tech
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              textTransform: 'none'
            }
          }}
        >
          <Tab 
            icon={<LanguageIcon />} 
            iconPosition="start" 
            label="Francophones" 
          />
          <Tab 
            icon={<LanguageIcon />} 
            iconPosition="start" 
            label="Anglophones" 
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          {youtubers.francophone.map(renderYoutuberCard)}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={4}>
          {youtubers.anglophone.map(renderYoutuberCard)}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default TechYoutubers;
