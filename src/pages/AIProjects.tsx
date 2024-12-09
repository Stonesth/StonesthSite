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
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const AIProjects = () => {
  const projects = [
    {
      id: "voice-generator",
      title: "Générateur d'Histoires avec Clone Vocal",
      description: "Un projet qui génère des histoires et les lit avec une voix clonée. Utilise Coqui TTS pour le clonage vocal et la synthèse vocale.",
      features: [
        "Génération d'histoires personnalisées",
        "Clonage de voix avec Coqui TTS",
        "Lecture des histoires avec la voix clonée",
        "Interface en ligne de commande",
        "Support multiplateforme (Windows/Mac)"
      ],
      technologies: [
        "Python 3.9",
        "Coqui TTS",
        "PyTorch",
        "NumPy",
        "SoundFile",
        "PyAudio"
      ],
      tasks: [
        "Configuration de l'environnement virtuel Python",
        "Installation des dépendances requises",
        "Intégration de Coqui TTS",
        "Implémentation du clonage vocal",
        "Génération et lecture des histoires",
        "Tests et optimisations"
      ],
      documentation: [
        { label: "Coqui TTS Documentation", url: "https://docs.coqui.ai/en/latest/models/xtts.html" },
        { label: "Issue GitHub", url: "https://github.com/coqui-ai/TTS/issues/3369" }
      ],
      status: "Terminé",
      icon: <RecordVoiceOverIcon />
    },
    {
      id: "image-generator",
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
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Mes Projets IA
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sx={{ position: 'sticky', top: 0, marginTop: '80px' }}>
          <Box sx={{ position: 'sticky', top: '80px', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            {/* Menu de navigation rapide */}
            <Paper 
              elevation={3}
              sx={{ 
                p: 2,
                mb: 4,
                background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Navigation Rapide
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`#${project.id}`}
                    sx={{ 
                      textDecoration: 'none',
                      color: 'white',
                      '&:hover': { textDecoration: 'none' }
                    }}
                  >
                    <Chip
                      icon={project.icon}
                      label={project.title}
                      clickable
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        }
                      }}
                    />
                  </Link>
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {/* Contenu principal */}
          {projects.map((project, index) => (
            <Grid item xs={12} key={index} id={project.id}>
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
                      backgroundColor: project.status === 'Terminé' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }} 
                  />

                  <Typography variant="body1" paragraph>
                    {project.description}
                  </Typography>

                  {project.technologies && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Technologies Utilisées
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.technologies.map((tech, idx) => (
                          <Chip
                            key={idx}
                            label={tech}
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
                  )}

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

                  {project.documentation && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Documentation
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.documentation.map((doc, idx) => (
                          <Link
                            key={idx}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ textDecoration: 'none' }}
                          >
                            <Chip
                              label={doc.label}
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                }
                              }}
                            />
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  )}

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
                      <Typography>Étapes du Projet</Typography>
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
      </Grid>
    </Container>
  );
};

export default AIProjects;
