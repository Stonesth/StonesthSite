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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getUserShoppingLists, createShoppingList } from '../services/shoppingListService';
import { getRecipes } from '../services/recipeService';
import { Recipe } from '../types/Recipe';
import { ShoppingList as ShoppingListType } from '../types/ShoppingList';
import ShoppingList from '../components/ShoppingList';

const ShoppingLists: React.FC = () => {
    const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState<ShoppingListType | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [listsData, recipesData] = await Promise.all([
                getUserShoppingLists(),
                getRecipes()
            ]);
            setShoppingLists(listsData);
            setRecipes(recipesData);
        } catch (err) {
            setError('Erreur lors du chargement des données');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateList = async () => {
        if (!newListName || selectedRecipes.length === 0) return;

        try {
            await createShoppingList(newListName, selectedRecipes);
            setCreateDialogOpen(false);
            setNewListName('');
            setSelectedRecipes([]);
            loadData();
        } catch (err) {
            setError('Erreur lors de la création de la liste');
            console.error(err);
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
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateDialogOpen(true)}
                >
                    Nouvelle liste
                </Button>
            </Box>

            {selectedList ? (
                <ShoppingList
                    shoppingList={selectedList}
                    onUpdate={loadData}
                    onDelete={() => {
                        setSelectedList(null);
                        loadData();
                    }}
                />
            ) : (
                <List>
                    {shoppingLists.map((list) => (
                        <ListItem
                            key={list.id}
                            button
                            onClick={() => setSelectedList(list)}
                            sx={{ border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}
                        >
                            <ListItemText
                                primary={list.title}
                                secondary={`${list.recipes.length} recettes - ${list.ingredients.length} ingrédients`}
                            />
                        </ListItem>
                    ))}
                </List>
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
