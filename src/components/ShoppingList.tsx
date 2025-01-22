import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    IconButton,
    Divider,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ShoppingList as ShoppingListType, ShoppingListIngredient } from '../types/ShoppingList';
import { Recipe } from '../types/Recipe';
import { updateIngredientStatus, updateRecipeServings, deleteShoppingList, addRecipeToList, removeRecipeFromList } from '../services/shoppingListService';
import { getAllRecipes } from '../services/recipeService';

interface ShoppingListProps {
    shoppingList: ShoppingListType;
    onUpdate: () => void;
    onDelete: () => void;
    onBack: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList, onUpdate, onDelete, onBack }) => {
    const [editingServings, setEditingServings] = useState<string | null>(null);
    const [newServings, setNewServings] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [addRecipeDialogOpen, setAddRecipeDialogOpen] = useState(false);
    const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAvailableRecipes = async () => {
            try {
                const recipes = await getAllRecipes();
                // Filtrer les recettes qui ne sont pas déjà dans la liste
                const availableRecipes = recipes.filter(
                    recipe => !shoppingList.recipes.some(r => r.recipeId === recipe.id)
                );
                setAvailableRecipes(availableRecipes);
            } catch (error) {
                console.error('Erreur lors du chargement des recettes:', error);
            }
        };
        if (addRecipeDialogOpen) {
            loadAvailableRecipes();
        }
    }, [addRecipeDialogOpen, shoppingList.recipes]);

    const filteredRecipes = availableRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleIngredientToggle = async (ingredient: ShoppingListIngredient) => {
        const updatedIngredients = shoppingList.ingredients.map(ing =>
            ing.name === ingredient.name && ing.unit === ingredient.unit
                ? { ...ing, checked: !ing.checked }
                : ing
        );

        await updateIngredientStatus(shoppingList.id!, updatedIngredients);
        onUpdate();
    };

    const handleServingsUpdate = async (recipeId: string) => {
        if (!newServings) return;

        const recipe = shoppingList.recipes.find(r => r.recipeId === recipeId);
        if (!recipe) return;

        const ratio = parseFloat(newServings) / parseFloat(recipe.servings); 
        const updatedIngredients = shoppingList.ingredients.map(ing => {
            if (ing.recipes.includes(recipeId)) {
                return {
                    ...ing,
                    quantity: (ing.quantity / parseFloat(recipe.servings)) * parseFloat(newServings)
                };
            }
            return ing;
        });

        await updateRecipeServings(shoppingList.id!, recipeId, newServings, updatedIngredients);
        setEditingServings(null);
        setNewServings('');
        onUpdate();
    };

    const handleAddRecipe = async () => {
        if (!selectedRecipe) return;
        
        setLoading(true);
        try {
            await addRecipeToList(shoppingList.id!, selectedRecipe);
            setAddRecipeDialogOpen(false);
            setSelectedRecipe(null);
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la recette:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveRecipe = async (recipeId: string) => {
        setLoading(true);
        try {
            await removeRecipeFromList(shoppingList.id!, recipeId);
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de la suppression de la recette:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        await deleteShoppingList(shoppingList.id!);
        setConfirmDelete(false);
        onDelete();
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton onClick={onBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" component="h2">
                        {shoppingList.name}
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={() => setAddRecipeDialogOpen(true)} color="primary">
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => setConfirmDelete(true)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
                Recettes
            </Typography>
            <List>
                {shoppingList.recipes.map((recipe) => (
                    <ListItem
                        key={recipe.recipeId}
                        secondaryAction={
                            <Box display="flex" alignItems="center">
                                {editingServings === recipe.recipeId ? (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <TextField
                                            size="small"
                                            type="number"
                                            value={newServings}
                                            onChange={(e) => setNewServings(e.target.value)}
                                            sx={{ width: 80 }}
                                        />
                                        <Button
                                            size="small"
                                            onClick={() => handleServingsUpdate(recipe.recipeId)}
                                        >
                                            OK
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => setEditingServings(null)}
                                        >
                                            Annuler
                                        </Button>
                                    </Box>
                                ) : (
                                    <>
                                        <IconButton
                                            onClick={() => {
                                                setEditingServings(recipe.recipeId);
                                                setNewServings(recipe.servings);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleRemoveRecipe(recipe.recipeId)}
                                            color="error"
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                        }
                    >
                        <ListItemText
                            primary={recipe.title}
                            secondary={`${recipe.servings} portions`}
                        />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
                Ingrédients
            </Typography>
            <List>
                {shoppingList.ingredients.map((ingredient, index) => (
                    <ListItem
                        key={index}
                        dense
                        sx={{
                            textDecoration: ingredient.checked ? 'line-through' : 'none',
                            color: ingredient.checked ? 'text.disabled' : 'text.primary'
                        }}
                    >
                        <Checkbox
                            edge="start"
                            checked={ingredient.checked}
                            onChange={() => handleIngredientToggle(ingredient)}
                        />
                        <ListItemText
                            primary={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                            secondary={`Utilisé dans : ${shoppingList.recipes
                                .filter(recipe => ingredient.recipes.includes(recipe.recipeId))
                                .map(recipe => recipe.title)
                                .join(', ')}`}
                        />
                    </ListItem>
                ))}
            </List>

            {/* Dialog d'ajout de recette */}
            <Dialog
                open={addRecipeDialogOpen}
                onClose={() => setAddRecipeDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Ajouter une recette à la liste</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Rechercher une recette"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {filteredRecipes.map((recipe) => (
                            <ListItem
                                key={recipe.id}
                                sx={{
                                    bgcolor: selectedRecipe?.id === recipe.id ? 'action.selected' : 'inherit',
                                    '&:hover': {
                                        bgcolor: 'action.hover'
                                    }
                                }}
                                onClick={() => setSelectedRecipe(recipe)}
                            >
                                <ListItemText primary={recipe.title} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddRecipeDialogOpen(false)}>Annuler</Button>
                    <Button
                        onClick={handleAddRecipe}
                        disabled={!selectedRecipe || loading}
                        variant="contained"
                    >
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog de confirmation de suppression */}
            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer cette liste de courses ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>Annuler</Button>
                    <Button onClick={handleDelete} color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ShoppingList;
