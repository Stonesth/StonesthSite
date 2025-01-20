import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    { title: 'Accueil', path: '/' },
    { title: 'Impression 3D', path: '/impression3d' },
    { title: 'IA', path: '/ia' },
    { title: 'YouTubeurs Tech', path: '/tech-youtubers' },
    { title: 'Microsoft Office', path: '/microsoft-office' },
    { title: 'Resources', path: '/resources' },
  ];

  const authenticatedPages = [
    { title: 'Admin', path: '/admin' },
    { title: 'Idées Repas', path: '/ideas-repas' },
  ];

  const currentUser = true; // Assuming currentUser is defined somewhere in your code

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stonesth Site
        </Typography>
        <Box>
          {pages.map((page, index) => (
            <Button key={index} color="inherit" component={Link} to={page.path}>
              {page.title}
            </Button>
          ))}
          {currentUser && authenticatedPages.map((page) => (
            <Button
              key={page.path}
              component={Link}
              to={page.path}
              sx={{ color: 'white', display: 'block' }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
