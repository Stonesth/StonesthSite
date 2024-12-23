import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    { name: 'Accueil', path: '/' },
    { name: 'Experts IA', path: '/ai-experts' },
    { name: 'Projets IA', path: '/ai-projects' },
    { name: 'YouTubeurs Tech', path: '/tech-youtubers' },
    { name: 'Impression 3D', path: '/3d-printing' },
    { name: 'Blockchain', path: '/blockchain' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stonesth Site
        </Typography>
        <Box>
          {pages.map((page, index) => (
            <Button key={index} color="inherit" component={Link} to={page.path}>
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
