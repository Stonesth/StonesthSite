# Format du fichier TODO
# Ce fichier suit une structure spécifique :
# 1. Les tâches terminées sont marquées avec [x]
# 2. Les tâches en cours sont marquées avec un tiret [-]
# 3. Les tâches à faire sont marquées avec [ ]
# 4. Les tâches sont regroupées par date
# 5. Chaque mise à jour doit conserver les tâches terminées en haut du fichier avec la date de la mise à jour

## Fait ✅ (21/01/2025)
- [x] Correction des problèmes d'authentification
  - [x] Initialisation correcte de la persistance Firebase
  - [x] Meilleure gestion de l'état de connexion
  - [x] Correction de l'affichage des recettes
  - [x] Ajout de logs pour le débogage
- [x] Amélioration de la gestion des routes protégées
  - [x] Protection de la route /ideas-repas
  - [x] Meilleure gestion des états de chargement
  - [x] Messages d'erreur plus clairs
- [x] Implémentation du CRUD complet des recettes
- [x] Création du composant RecipeForm pour l'édition des recettes
- [x] Création du composant RecipeCard pour l'affichage des recettes
- [x] Mise en place des règles Firestore pour les recettes
- [x] Configuration de l'API REST Firestore
- [x] Correction du bug d'édition des recettes
- [x] Amélioration de la gestion des erreurs Firestore
- [x] Optimisation des requêtes API pour les recettes
- [x] Ajout de la fonctionnalité de recherche dans les recettes
  - [x] Recherche par titre
  - [x] Recherche par description
  - [x] Recherche par ingrédients
  - [x] Recherche par instructions
- [x] Ajout des filtres de temps
  - [x] Filtre par temps de préparation
  - [x] Filtre par temps de cuisson
  - [x] Interface avec sliders
  - [x] Formatage intelligent des durées

## Fait ✅ (20/01/2025)
- [x] Système de connexion complet
- [x] Interface d'administration de base
- [x] Ajouter l'affichage de la version de l'application en bas de chaque page
  - [x] Créer un composant Footer réutilisable
  - [x] Afficher la version depuis package.json
  - [x] Implémenter le footer sur toutes les pages
  - [x] Synchroniser la version avec CHANGELOG.md

## Fait ✅ (08/03/2024)
- [x] Section IA enrichie :
  - [x] Projet principal de génération d'images
  - [x] Ressources de génération d'images
  - [x] Outils de génération de vidéos
  - [x] Solutions de création d'avatars
  - [x] Liste des assistants IA
  - [x] Tutoriels et ressources

## Fait ✅ (07/03/2024)
- [x] Initialisation du projet avec Vite et TypeScript
- [x] Configuration de base de Material-UI
- [x] Mise en place du routage
- [x] Création de la barre de navigation
- [x] Ajouter l'affichage de la version de l'application en bas de chaque page
  - [x] Créer un composant Footer réutilisable
  - [x] Afficher la version depuis package.json
  - [x] Implémenter le footer sur toutes les pages
  - [x] Synchroniser la version avec CHANGELOG.md

## TODO List

### En cours
- [-] Optimisation des performances de chargement :
  - [-] Implémenter le code splitting avec dynamic imports
  - [-] Optimiser la taille des chunks JavaScript
  - [-] Ajuster les limites de taille des chunks
- [-] Amélioration de l'interface utilisateur
- [-] Documentation du code

### Haute priorité
- [ ] Ajouter le tri par date ou titre
- [ ] Créer un système de catégories pour les recettes
- [ ] Ajouter la possibilité de partager des recettes
- [ ] Ajouter une option végétarien pour les recettes
  - [ ] Ajouter un champ booléen "isVegetarian" dans le type Recipe
  - [ ] Mettre à jour le formulaire RecipeForm avec une case à cocher
  - [ ] Ajouter un badge ou une icône dans RecipeCard pour indiquer si la recette est végétarienne
  - [ ] Ajouter un filtre pour afficher uniquement les recettes végétariennes
  - [ ] Mettre à jour la base de données avec le nouveau champ

### Resources
- [ ] Ajouter plus de ressources pour chaque catégorie
- [ ] Implémenter un système de favoris
- [ ] Ajouter des descriptions détaillées pour chaque ressource
- [ ] Système de suivi des recettes réalisées
  - [ ] Ajouter un compteur de réalisations pour chaque recette
  - [ ] Mettre à jour le compteur lors de la validation du panier
  - [ ] Stocker l'historique des réalisations avec dates

### Gestion des Courses
- [ ] Système de liste de courses
  - [ ] Sélection des recettes à préparer
  - [ ] Génération automatique de la liste d'ingrédients
  - [ ] Fusion des ingrédients similaires
  - [ ] Bouton de validation du panier
  - [ ] Envoi de la liste par email
  - [ ] Export de la liste au format PDF

### Sélection Aléatoire
- [ ] Page de sélection aléatoire de recettes
  - [ ] Algorithme de sélection basé sur le nombre de réalisations
  - [ ] Filtres pour la sélection aléatoire (temps, catégorie)
  - [ ] Possibilité de régénérer une suggestion
  - [ ] Affichage des statistiques de réalisation

### Intégration Calendrier
- [ ] Intégration avec Google Calendar
  - [ ] Ajout des recettes sélectionnées au calendrier
  - [ ] Choix de la date et heure du repas
  - [ ] Rappels automatiques pour la préparation
  - [ ] Synchronisation avec l'application mobile

### Améliorations Générales
- [ ] Améliorer le design responsive
- [ ] Implémenter un mode sombre/clair
- [ ] Ajouter des animations de transition

### Priorité Basse
- [ ] Implémenter un système de notifications
- [ ] Optimiser les performances de l'application
- [ ] Ajouter des tests unitaires et d'intégration

## Améliorations Techniques
- [ ] Mettre en place le code splitting pour réduire la taille du bundle
- [ ] Améliorer la gestion des erreurs
- [ ] Ajouter des logs pour le débogage
- [ ] Optimiser les requêtes Firestore
- [ ] Mettre en place un système de cache

## Documentation
- [ ] Créer une documentation technique
- [ ] Rédiger un guide d'utilisation
- [ ] Documenter l'API
- [ ] Ajouter des commentaires dans le code
- [ ] Documenter les composants React
- [ ] Créer un guide d'utilisation

## À Faire 

### Section IA
- [ ] Ajouter plus de projets IA
- [ ] Intégrer des démonstrations interactives
- [ ] Ajouter des captures d'écran des projets
- [ ] Créer une section pour les retours d'expérience
- [ ] Intégrer un système de favoris
- [ ] Ajouter des statistiques d'utilisation
- [ ] Implémenter le projet de génération d'images

### Section Impression 3D
- [ ] Ajouter des images pour les projets
- [ ] Ajouter des descriptions détaillées
- [ ] Intégrer un système de filtrage des projets
- [ ] Ajouter un système de suivi de progression des projets
- [ ] Intégrer des statistiques d'impression

### Section Idées Repas
- [ ] Mise en place de la structure de base :
  - [ ] Création de la page protégée IdeasRepas
  - [ ] Intégration avec le système d'authentification
  - [ ] Ajout du lien dans la navigation (visible uniquement pour les utilisateurs connectés)

- [ ] Fonctionnalités prévues :
  - [ ] Catégories de repas :
    - Petit déjeuner
    - Déjeuner
    - Dîner
    - Snacks
    - Desserts
  - [ ] Pour chaque recette :
    - Temps de préparation
    - Niveau de difficulté
    - Nombre de personnes
    - Ingrédients nécessaires
    - Étapes de préparation
    - Photos (optionnel)
    - Tags (végétarien, rapide, économique, etc.)
  - [ ] Fonctionnalités additionnelles :
    - Système de favoris
    - Planification de repas hebdomadaire
    - Génération automatique de liste de courses
    - Calcul des portions
    - Suggestions basées sur les ingrédients disponibles
    - Mode hors-ligne pour accès sans connexion
    - Partage de recettes entre utilisateurs
    - Système de notation et commentaires

- [ ] Interface utilisateur :
  - [ ] Vue en grille avec filtres
  - [ ] Mode d'affichage compact/détaillé
  - [ ] Recherche par ingrédients/tags
  - [ ] Interface d'édition intuitive
  - [ ] Mode impression optimisé

### Section Admin
- [ ] Ajouter des statistiques d'utilisation
- [ ] Implémenter la gestion des utilisateurs
- [ ] Créer un système de logs
- [ ] Ajouter la possibilité de modérer les contenus

### Améliorations Générales
- [ ] Optimiser le chargement des images
- [ ] Améliorer la réactivité mobile
- [ ] Ajouter des tests automatisés
- [ ] Implémenter un système de cache
- [ ] Ajouter des animations de transition
- [ ] Mettre en place un système de notifications

### Documentation
- [ ] Créer une documentation technique
- [ ] Rédiger un guide d'utilisation
- [ ] Documenter l'API
- [ ] Ajouter des commentaires dans le code

### Sécurité
- [ ] Renforcer la sécurité des routes protégées
- [ ] Ajouter une validation des données
- [ ] Mettre en place un système de backup
- [ ] Implémenter la récupération de mot de passe

### Configuration Firebase
- [ ] Configuration des clés d'API
- [ ] Configuration de la base de données
- [ ] Règles de sécurité Firestore

### Administration
- [ ] Fonctionnalités du tableau de bord admin :
  - [ ] Connexion des statistiques réelles :
    - [ ] Nombre de visiteurs
    - [ ] Nombre d'articles
    - [ ] Nombre de commentaires
    - [ ] Nombre d'utilisateurs
  - [ ] Implémentation des actions rapides :
    - [ ] Création et édition d'articles
    - [ ] Système de gestion des médias
    - [ ] Système de modération des commentaires
  - [ ] Activité récente :
    - [ ] Logging des actions administratives
    - [ ] Historique des modifications
    - [ ] Système de notifications

### Fonctionnalités
- [ ] Système de commentaires
- [ ] Système de notification
- [ ] Tests unitaires

### Design
- [ ] Amélioration du design responsive
- [ ] Mode sombre
- [ ] Animations
- [ ] Optimisation des images

### Optimisation
- [ ] Obtenir une clé API YouTube Data v3 pour les images de profil
- [ ] Exécuter le script de téléchargement des avatars
- [ ] Intégrer les images de profil dans le composant TechYoutubers
- [ ] Ajouter des filtres de recherche pour les YouTubeurs (par catégorie, langue)
- [ ] Implémenter un système de favoris persistant
- [ ] Ajouter des liens vers les dernières vidéos
