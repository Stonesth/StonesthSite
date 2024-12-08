import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ThreeDPrinting = () => {
  const resources = {
    controls: [
      {
        title: "Contrôle FLSUN Super Racer",
        url: "http://yumios.local/",
        description: "Interface de contrôle de mon imprimante FLSUN Super Racer"
      }
    ],
    modelSites: [
      {
        title: "Cults3D",
        url: "https://cults3d.com/",
        description: "Site de modèles 3D payants et gratuits"
      },
      {
        title: "OnShape CAD",
        url: "https://cad.onshape.com/documents",
        description: "Plateforme de design 3D en ligne"
      }
    ],
    tutorials: [
      {
        title: "Comment créer des FIGURINES avec une IMPRIMANTE 3D FDM",
        url: "https://www.youtube.com/watch?v=8uUISiFJUeM"
      },
      {
        title: "Imprimante 3D FDM = Comment imprimer ses figurines",
        url: "https://www.youtube.com/watch?v=S594x4oWTe8"
      },
      {
        title: "On arrive à un truc propre ! Figurines en FILAMENTS",
        url: "https://www.youtube.com/watch?v=uCgdnIJXjM8"
      },
      {
        title: "IMPRESSION 3D FDM SANS SUPPORTS",
        url: "https://www.youtube.com/watch?v=_XhK13CPjqM"
      },
      {
        title: "Un tank en FDM 50 microns sur Ankermake M5C",
        url: "https://www.youtube.com/watch?v=-TQ5variIjE"
      },
      {
        title: "Des finitions parfaites pour vos impressions 3D",
        url: "https://www.youtube.com/watch?v=hSy-gLlpBG8"
      }
    ],
    equipment: {
      camera: [
        {
          title: "Comment installer FACILEMENT une WEBCAM sur Mainsail (Klipper)",
          url: "https://www.youtube.com/watch?v=28-UuNRW8wE"
        }
      ],
      smartPad: [
        {
          title: "Tout Savoir sur le SMART PAD - VOD",
          url: "https://www.youtube.com/watch?v=Z2h9wVGzdJU"
        }
      ],
      documentation: [
        {
          title: "Configuration reference - Klipper",
          url: "https://www.klipper3d.org/Config_Reference.html"
        }
      ]
    },
    projects: {
      starWars: [
        {
          title: "Lego Sand Trooper Scale 1:1",
          url: "https://cults3d.com/fr/modèle-3d/jeu/lego-sand-trooper-scale-1-1-star-wars-minifigure-fully-functional"
        },
        {
          title: "Plaque de base du Space Display",
          url: "https://cults3d.com/fr/modèle-3d/jeu/space-display-baseplate"
        },
        {
          title: "Les murs de l'étoile de la mort",
          url: "https://cults3d.com/fr/modèle-3d/jeu/star-wars-death-star-walls-lego-blocks"
        }
      ],
      vehicles: [
        {
          title: "CRAMER Truggy RC 4x4",
          url: "https://cults3d.com/fr/modèle-3d/jeu/cramer-truggy-rc-4x4-full-3d-printed"
        },
        {
          title: "Châssis adaptable 1/10 - DKS-Basic",
          url: "https://cults3d.com/fr/modèle-3d/jeu/casis-1-10-adaptable"
        },
        {
          title: "M4A3E8 Tank",
          url: "https://makeitreal.ankermake.com/models/765f2dcbfc4411ee8911fe6fac689a4c/M4A3E8%20Tank"
        }
      ],
      figures: [
        {
          title: "Soldat moderne avec M4",
          url: "https://cults3d.com/fr/modèle-3d/jeu/modern-soldier-m4-firing"
        },
        {
          title: "Space Soldier",
          url: "https://cults3d.com/fr/modèle-3d/jeu/space-foot-soldier-remix"
        }
      ]
    },
    dragonBlade: {
      resources: [
        {
          title: "Kit RC Car STEM",
          url: "https://www.amazon.com/Self-Centering-Steering-Car，stem-Projects-8-12，Engineering/dp/B0CGVJNVYH"
        },
        {
          title: "DIY 3D Printed RC Car Kit",
          url: "https://www.etsy.com/listing/1703411922/diy-3d-printed-rc-car-kit-educational"
        }
      ]
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Impression 3D
        </Typography>

        {/* Contrôle et Sites */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Contrôle et Ressources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Contrôle Imprimante
                    </Typography>
                    <List>
                      {resources.controls.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                            secondary={item.description}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Sites de Modèles
                    </Typography>
                    <List>
                      {resources.modelSites.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                            secondary={item.description}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Tutoriels */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Tutoriels</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <List>
                  {resources.tutorials.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>

        {/* Équipement */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Équipement</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Caméra
                    </Typography>
                    <List>
                      {resources.equipment.camera.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Smart Pad
                    </Typography>
                    <List>
                      {resources.equipment.smartPad.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Documentation
                    </Typography>
                    <List>
                      {resources.equipment.documentation.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Projets */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Projets</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Star Wars
                    </Typography>
                    <List>
                      {resources.projects.starWars.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Véhicules
                    </Typography>
                    <List>
                      {resources.projects.vehicles.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Figurines
                    </Typography>
                    <List>
                      {resources.projects.figures.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Projet DragonBlade */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Projet DragonBlade</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <Typography variant="body1" paragraph>
                  Projet de création d'une voiture RC personnalisée
                </Typography>
                <List>
                  {resources.dragonBlade.resources.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={<Link href={item.url} target="_blank">{item.title}</Link>}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default ThreeDPrinting;
