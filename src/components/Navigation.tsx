import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const pages = [
    { title: 'Accueil', path: '/' },
    { title: 'Idées Repas', path: '/ideas-repas' },
    { title: 'Liste de Courses', path: '/shopping-lists' },
];

const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { currentUser, signOut } = useAuth();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            handleCloseUserMenu();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo/Title - visible on desktop */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MonSite
                    </Typography>

                    {/* Mobile menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.path}
                                    onClick={handleCloseNavMenu}
                                    component={RouterLink}
                                    to={page.path}
                                >
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo/Title - visible on mobile */}
                    <Typography
                        variant="h5"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MonSite
                    </Typography>

                    {/* Desktop menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                component={RouterLink}
                                to={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    {/* User menu */}
                    {currentUser && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Ouvrir les paramètres">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Déconnexion</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;
