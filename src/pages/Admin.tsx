import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, Alert } from '@mui/material';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, AuthError, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin-dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error('Erreur de connexion:', authError);
      
      if (authError.code === 'auth/network-request-failed') {
        setError('Si vous utilisez un bloqueur de publicités, veuillez l\'autoriser temporairement pour ce site ou ajouter une exception pour identitytoolkit.googleapis.com');
      } else {
        let errorMessage = 'Erreur de connexion: ';
        switch (authError.code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            errorMessage = 'Email ou mot de passe incorrect';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Trop de tentatives. Veuillez réessayer plus tard';
            break;
          default:
            errorMessage = 'Une erreur est survenue. Veuillez réessayer';
        }
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Administration
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              disabled={loading}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Admin;
