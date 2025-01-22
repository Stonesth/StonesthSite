import React, { useState } from 'react';
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
import { ShoppingList as ShoppingListType, ShoppingListIngredient } from '../types/ShoppingList';
import { updateIngredientStatus, updateRecipeServings, deleteShoppingList } from '../services/shoppingListService';

interface ShoppingListProps {
    shoppingList: ShoppingListType;
    onUpdate: () => void;
    onDelete: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList, onUpdate, onDelete }) => {
    const [editingServings, setEditingServings] = useState<string | null>(null);
    const [newServings, setNewServings] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

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

        // Mettre à jour les quantités des ingrédients
        const recipe = shoppingList.recipes.find(r => r.recipeId === recipeId);
        if (!recipe) return;

        const ratio = parseFloat(newServings) / parseFloat(recipe.originalServings);
        const updatedIngredients = shoppingList.ingredients.map(ing => {
            if (ing.recipes.includes(recipeId)) {
                return {
                    ...ing,
                    quantity: ing.quantity * ratio
                };
            }
            return ing;
        });

        await updateRecipeServings(shoppingList.id!, recipeId, newServings, updatedIngredients);
        setEditingServings(null);
        setNewServings('');
        onUpdate();
    };

    const handleDelete = async () => {
        await deleteShoppingList(shoppingList.id!);
        setConfirmDelete(false);
        onDelete();
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" component="h2">
                    {shoppingList.name}
                </Typography>
                <IconButton onClick={() => setConfirmDelete(true)} color="error">
                    <DeleteIcon />
                </IconButton>
            </Box>

            <Typography variant="h6" gutterBottom>
                Recettes
            </Typography>
            <List>
                {shoppingList.recipes.map((recipe) => (
                    <ListItem
                        key={recipe.recipeId}
                        secondaryAction={
                            editingServings === recipe.recipeId ? (
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
                                <IconButton
                                    onClick={() => {
                                        setEditingServings(recipe.recipeId);
                                        setNewServings(recipe.servings);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            )
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
