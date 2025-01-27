import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getUserShoppingLists, createShoppingList, deleteShoppingList } from '../services/shoppingListService';
import { getAllRecipes } from '../services/recipeService';
import { Recipe } from '../types/Recipe';
import { ShoppingList as ShoppingListType } from '../types/ShoppingList';
import ShoppingList from '../components/ShoppingList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ShoppingLists: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState<ShoppingListType | null>(null);

  useEffect(() => {
    if (currentUser?.uid) {
      loadData();
    } else {
      setLoading(false);
      setError("Vous devez être connecté pour voir vos listes de courses");
    }
  }, [currentUser]);

  const loadData = async () => {
    if (!currentUser?.uid) {
      setError("Vous devez être connecté pour voir vos listes de courses");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [lists, recipesData] = await Promise.all([
        getUserShoppingLists(currentUser.uid),
        getAllRecipes()
      ]);
      setShoppingLists(lists);
      // Si une liste est sélectionnée, mettre à jour ses données
      if (selectedList) {
        const updatedSelectedList = lists.find(list => list.id === selectedList.id);
        setSelectedList(updatedSelectedList || null);
      }
      setRecipes(recipesData);
      setError(null);
    } catch (error) {
      console.error('Error loading data:', error);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async () => {
    if (!currentUser?.uid || !newListName || selectedRecipes.length === 0) {
      setError("Impossible de créer la liste. Veuillez vous connecter et sélectionner des recettes.");
      return;
    }

    try {
      await createShoppingList(currentUser.uid, {
        name: newListName,
        recipes: selectedRecipes.map(recipe => ({
          recipeId: recipe.id!,
          title: recipe.title,
          servings: recipe.servings,
          originalServings: recipe.servings
        })),
        ingredients: selectedRecipes.flatMap(recipe => 
          recipe.ingredients?.map(ingredient => ({
            name: ingredient.name,
            quantity: parseFloat(ingredient.quantity),
            unit: ingredient.unit,
            checked: false,
            recipes: [recipe.id!]
          })) || []
        ),
        userId: currentUser.uid
      });
      setCreateDialogOpen(false);
      setNewListName('');
      setSelectedRecipes([]);
      await loadData();
    } catch (error) {
      console.error('Error creating shopping list:', error);
      setError('Erreur lors de la création de la liste');
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      await deleteShoppingList(listId);
      await loadData(); // Attendre que les données soient rechargées
    } catch (error) {
      console.error('Error deleting shopping list:', error);
      setError("Erreur lors de la suppression de la liste");
    }
  };

  const handleRecipeToggle = (recipe: Recipe) => {
    setSelectedRecipes(prev =>
      prev.find(r => r.id === recipe.id)
        ? prev.filter(r => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container>
        <Typography>Veuillez vous connecter pour voir vos listes de courses.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Listes de courses
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/ideas-repas')}
            startIcon={<RestaurantIcon />}
          >
            Retour aux recettes
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Nouvelle liste
          </Button>
        </Box>
      </Box>

      {selectedList ? (
        <ShoppingList
          shoppingList={selectedList}
          onUpdate={loadData}
          onDelete={() => {
            handleDeleteList(selectedList.id);
            setSelectedList(null);
          }}
          onBack={() => setSelectedList(null)}
        />
      ) : (
        <Grid container spacing={3}>
          {shoppingLists.map((list) => (
            <Grid item xs={12} key={list.id}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{list.name}</Typography>
                  <Box>
                    <IconButton 
                      onClick={() => setSelectedList(list)}
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => list.id && handleDeleteList(list.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <List>
                  {list.recipes.map((recipe) => (
                    <ListItem key={recipe.recipeId}>
                      <ListItemText
                        primary={recipe.title}
                        secondary={`${recipe.servings} portions`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de création de liste */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Créer une nouvelle liste de courses</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom de la liste"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            margin="normal"
          />
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Sélectionner les recettes
          </Typography>
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id} dense>
                <Checkbox
                  edge="start"
                  checked={selectedRecipes.some(r => r.id === recipe.id)}
                  onChange={() => handleRecipeToggle(recipe)}
                />
                <ListItemText primary={recipe.title} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Annuler</Button>
          <Button
            onClick={handleCreateList}
            disabled={!newListName || selectedRecipes.length === 0}
            variant="contained"
          >
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShoppingLists;
