import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const AIProjects = () => {
  const projects = [
    {
      title: "IA Générative d'Images",
      description: "Création d'une IA capable de générer des images à partir de descriptions textuelles",
      features: [
        "Génération d'images réalistes basées sur des prompts détaillés",
        "Spécification du style artistique (peinture à l'huile, aquarelle, pixel art)",
        "Modification d'images existantes",
        "Interface utilisateur conviviale"
      ],
      tasks: [
        "Choisir une plateforme d'hébergement adaptée",
        "Sélectionner un modèle d'IA pour la génération d'images",
        "Développer l'interface utilisateur",
        "Intégrer l'API du modèle d'IA",
        "Mettre en place la gestion des utilisateurs",
        "Implémenter le stockage des images",
        "Assurer la sécurité",
        "Tester le site",
        "Déployer l'application",
        "Configurer la surveillance"
      ],
      status: "En développement",
      icon: <ImageIcon />
    },
    // Vous pouvez ajouter d'autres projets ici
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Mes Projets IA
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)', 
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute', 
                top: -20, 
                right: -20, 
                opacity: 0.1, 
                transform: 'rotate(15deg)',
                fontSize: '150px'
              }}>
                {project.icon}
              </Box>

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {project.icon}
                  {project.title}
                </Typography>

                <Chip 
                  label={project.status} 
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }} 
                />

                <Typography variant="body1" paragraph>
                  {project.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Fonctionnalités
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Accordion 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:before': {
                      display: 'none',
                    }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    <Typography>Roadmap du Projet</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {project.tasks.map((task, idx) => (
                      <Typography 
                        key={idx} 
                        component="div" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          '&:before': {
                            content: '"•"',
                            marginRight: '8px',
                          }
                        }}
                      >
                        {task}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AIProjects;
