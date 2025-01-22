import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Typography,
  Divider
} from '@mui/material';
import { Recipe, CookingHistoryEntry } from '../types/Recipe';
import { Timestamp } from 'firebase/firestore';

interface CookingHistoryProps {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
  onAddEntry: (note: string) => Promise<void>;
}

const CookingHistory: React.FC<CookingHistoryProps> = ({
  open,
  onClose,
  recipe,
  onAddEntry,
}) => {
  const [note, setNote] = React.useState('');

  const handleSubmit = async () => {
    await onAddEntry(note);
    setNote('');
    onClose();
  };

  const formatDate = (date: Timestamp) => {
    return date.toDate().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Historique des réalisations - {recipe.title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Réalisée {recipe.timesCooked} fois
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List>
          {recipe.cookingHistory
            .sort((a, b) => b.date.seconds - a.date.seconds)
            .map((entry, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={formatDate(entry.date)}
                  secondary={entry.note || 'Aucune note'}
                />
              </ListItem>
            ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Ajouter une nouvelle réalisation
          </Typography>
          <TextField
            fullWidth
            label="Note (optionnelle)"
            multiline
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ajoutez une note sur cette réalisation (modifications, impressions...)"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Marquer comme réalisée
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookingHistory;
