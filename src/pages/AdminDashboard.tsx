import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

// Icônes simulées (à remplacer par de vraies icônes si besoin)
const Icon = () => <div style={{ width: 24, height: 24, backgroundColor: '#ddd', borderRadius: '50%' }} />;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Données simulées pour la démonstration
  const stats = {
    visiteurs: '1,234',
    articles: '12',
    commentaires: '48',
    utilisateurs: '3'
  };

  const recentActions = [
    { id: 1, action: 'Nouvel article publié', date: '20/01/2024' },
    { id: 2, action: 'Commentaire approuvé', date: '19/01/2024' },
    { id: 3, action: 'Mise à jour de la page d\'accueil', date: '18/01/2024' }
  ];

  const quickActions = [
    { title: 'Nouvel Article', description: 'Créer et publier un nouvel article' },
    { title: 'Gérer les Médias', description: 'Ajouter ou modifier des images et vidéos' },
    { title: 'Modération', description: 'Gérer les commentaires en attente' }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        {/* En-tête */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Tableau de Bord Administrateur</Typography>
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              Déconnexion
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Statistiques */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Vue d'ensemble</Typography>
              <Grid container spacing={3}>
                {Object.entries(stats).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                        <Typography variant="h4">{value}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Actions Rapides */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Actions Rapides</Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={12} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{action.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {action.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Commencer
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Activité Récente */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Activité Récente</Typography>
              <List>
                {recentActions.map((action) => (
                  <React.Fragment key={action.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={action.action}
                        secondary={action.date}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Message d'information */}
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: 2 }}>
              Cette interface est en cours de développement. D'autres fonctionnalités seront ajoutées prochainement.
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
