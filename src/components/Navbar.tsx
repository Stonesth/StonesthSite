import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {pages.map((page) => (
            <Button
              key={page.path}
              component={Link}
              to={page.path}
              sx={{ color: 'white' }}
            >
              {page.title}
            </Button>
          ))}
          {user && authenticatedPages.map((page) => (
            <Button
              key={page.path}
              component={Link}
              to={page.path}
              sx={{ color: 'white' }}
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
