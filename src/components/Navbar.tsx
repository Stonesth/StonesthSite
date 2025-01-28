import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  
  const pages = [
    { title: 'Accueil', path: '/' },
    { title: 'Impression 3D', path: '/3d-printing' },
    { title: 'IA', path: '/ai-experts' },
    { title: 'YouTubeurs Tech', path: '/tech-youtubers' },
    { title: 'Resources', path: '/resources' },
  ];

  const authenticatedPages = [
    { title: 'Dashboard Admin', path: '/admin-dashboard' },
    { title: 'Idées Repas', path: '/ideas-repas' },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const allPages = [...pages, ...(user ? authenticatedPages : [])];

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {allPages.map((page) => (
                <MenuItem 
                  key={page.path} 
                  component={Link} 
                  to={page.path}
                  onClick={handleClose}
                >
                  {page.title}
                </MenuItem>
              ))}
              {!user && (
                <MenuItem 
                  component={Link} 
                  to="/admin"
                  onClick={handleClose}
                >
                  Connexion
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <>
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
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {!user && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{ color: 'white' }}
                >
                  Connexion
                </Button>
              )}
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
