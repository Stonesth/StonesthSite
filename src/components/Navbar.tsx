import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stonesth Site
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Accueil</Button>
          <Button color="inherit" component={Link} to="/ai-experts">Experts IA</Button>
          <Button color="inherit" component={Link} to="/3d-printing">Impression 3D</Button>
          <Button color="inherit" component={Link} to="/admin">Admin</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
