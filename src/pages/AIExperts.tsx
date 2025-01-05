import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Link,
  Paper,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ChatIcon from '@mui/icons-material/Chat';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const AIExperts = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | undefined>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const resources = {
    imageGeneration: [
      { name: "Perchance AI", url: "https://perchance.org/ai-text-to-image-generator", description: "Générateur gratuit et illimité" },
      { name: "Seaart.ai", url: "https://www.seaart.ai/fr/explore/detail/chgvapp4msb8lp6aqamg", description: "Exploration artistique IA" },
      { name: "Ideogram", url: "https://ideogram.ai/", description: "Génération d'images pour tous" },
      { name: "KREA", url: "https://www.krea.ai/", description: "Plateforme créative IA" },
      { name: "Visual Electric", url: "https://visualelectric.com/", description: "Générateur d'images avancé" },
      { name: "Pika", url: "https://pika.art/", description: "Art génératif" },
      { name: "Luma Dream", url: "https://lumalabs.ai/dream-machine", description: "Machine de rêve créative" }
    ],
    videoGeneration: [
      { name: "Pika Labs", url: "https://pika.art/", description: "Génération de vidéos IA" },
      { name: "D-ID Studio", url: "https://studio.d-id.com/", description: "Création d'avatars animés" },
      { name: "Luma Dream Machine", url: "https://lumalabs.ai/dream-machine", description: "Générateur vidéo avancé" }
    ],
    avatarCreation: [
      { name: "ML Talking Face", url: "https://huggingface.co/spaces/CVPR/ml-talking-face", description: "Génération de visages parlants" },
      { name: "Canva AI", url: "https://www.canva.com/your-apps", description: "Création d'avatars avec Canva" },
      { name: "Vidnoz AI", url: "https://aiapp-fr.vidnoz.com/tools/index.html", description: "Outils IA pour avatars" }
    ],
    aiChats: [
      { name: "Napkin", url: "https://napkin.ai/", description: "Assistant IA créatif" },
      { name: "Perplexity", url: "https://www.perplexity.ai/", description: "IA conversationnelle avancée" },
      { name: "Claude", url: "https://claude.ai/", description: "Assistant IA sophistiqué" },
      { name: "ChatGPT", url: "https://chat.openai.com/", description: "IA conversationnelle populaire" },
      { name: "Copilot", url: "https://copilot.microsoft.com/", description: "Assistant IA Microsoft" },
      { name: "You.com", url: "https://you.com/", description: "Moteur de recherche IA" }
    ],
    tutorials: [
      { name: "Claude 3.5 Sonnet API Tutorial", url: "https://www.youtube.com/watch?v=tPq_W1WZ4_8", description: "Création d'un analyseur d'écriture" },
      { name: "IA Privée", url: "https://www.youtube.com/watch?v=WxYC9-hBM_g", description: "Configuration d'une IA privée" },
      { name: "Génération d'Applications", url: "https://www.youtube.com/watch?v=oOz2zPjJk0o", description: "Création d'applications avec l'IA" },
      { name: "Pika Labs Tutorial", url: "https://www.youtube.com/watch?v=YnlyJnR5Abc", description: "Guide complet Pika Labs" }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Date de publication : 9 décembre 2024
        </Typography>
      </Box>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }} id="top">
        Intelligence Artificielle
      </Typography>

      {/* Bouton vers les projets */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<RocketLaunchIcon />}
          onClick={() => navigate('/ai-projects')}
          sx={{
            background: 'linear-gradient(45deg, #1976d2 30%, #64b5f6 90%)',
            color: 'white',
            px: 4,
            py: 2,
            fontSize: '1.2rem',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)',
            }
          }}
        >
          Découvrir mes Projets IA
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component="a" href="#generation-images" onClick={handleClose}>Génération d'Images</MenuItem>
          <MenuItem component="a" href="#generation-videos" onClick={handleClose}>Génération de Vidéos</MenuItem>
          <MenuItem component="a" href="#creation-avatars" onClick={handleClose}>Création d'Avatars</MenuItem>
          <MenuItem component="a" href="#assistants-ia" onClick={handleClose}>Assistants IA</MenuItem>
          <MenuItem component="a" href="#tutoriels-ressources" onClick={handleClose}>Tutoriels et Ressources</MenuItem>
        </Menu>
      </Box>

      {/* Ressources */}
      <Grid container spacing={3}>
        {/* Génération d'Images */}
        <Grid item xs={12} md={6} id="generation-images">
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ImageIcon sx={{ mr: 1 }} /> Génération d'Images
              </Typography>
              {resources.imageGeneration.map((tool, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                    <Typography variant="subtitle1">{tool.name}</Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {tool.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Génération de Vidéos */}
        <Grid item xs={12} md={6} id="generation-videos">
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <VideoLibraryIcon sx={{ mr: 1 }} /> Génération de Vidéos
              </Typography>
              {resources.videoGeneration.map((tool, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                    <Typography variant="subtitle1">{tool.name}</Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {tool.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Création d'Avatars */}
        <Grid item xs={12} md={6} id="creation-avatars">
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <BuildIcon sx={{ mr: 1 }} /> Création d'Avatars
              </Typography>
              {resources.avatarCreation.map((tool, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                    <Typography variant="subtitle1">{tool.name}</Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {tool.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Chats IA */}
        <Grid item xs={12} md={6} id="assistants-ia">
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ChatIcon sx={{ mr: 1 }} /> Assistants IA
              </Typography>
              {resources.aiChats.map((tool, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                    <Typography variant="subtitle1">{tool.name}</Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {tool.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Tutoriels */}
        <Grid item xs={12} id="tutoriels-ressources">
          <Card>
            <CardContent id="tutoriels-ressources">
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1 }} /> Tutoriels et Ressources
              </Typography>
              <Grid container spacing={2}>
                {resources.tutorials.map((tutorial, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Link href={tutorial.url} target="_blank" rel="noopener noreferrer">
                        <Typography variant="subtitle1">{tutorial.name}</Typography>
                      </Link>
                      <Typography variant="body2" color="text.secondary">
                        {tutorial.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIExperts;
