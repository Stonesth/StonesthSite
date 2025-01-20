import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import packageJson from '../../package.json';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MonSite. Tous droits réservés.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/mentions-legales" color="text.secondary" underline="hover">
              Mentions légales
            </Link>
            <Typography variant="body2" color="text.secondary">
              Version {packageJson.version}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
