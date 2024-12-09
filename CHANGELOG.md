# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [0.3.3] - 2024-12-09

### Modifié
- Mise à jour du menu de navigation pour le rendre visible lors du défilement de la page, repositionné sous le titre "Mes Projets IA". Cette mise à jour améliore l'expérience utilisateur en permettant un accès facile au menu de navigation même lorsque l'utilisateur fait défiler la page. Le menu a également été repositionné pour une meilleure visibilité et une navigation plus intuitive. Les modifications incluent :
  - Ajout d'un effet de défilement pour maintenir le menu visible en haut de la page
  - Repositionnement du menu sous le titre "Mes Projets IA" pour une meilleure organisation
  - Amélioration de la mise en page pour une navigation plus intuitive

## [0.3.2] - 2024-12-08

### Ajouté
- Script Python pour télécharger automatiquement les avatars des YouTubeurs via l'API YouTube Data v3
- Dossier `src/assets/youtubers` pour stocker les images des profils

### Modifié
- Implémentation temporaire d'avatars générés avec les initiales en attendant l'intégration de l'API YouTube

### À faire
- Obtenir une clé API YouTube Data v3
- Intégrer les vraies images de profil des YouTubeurs

## [0.3.1] - 2024-12-08

### Ajouté
- Ajout du projet de génération d'histoires avec clone vocal dans la section IA
- Amélioration du design de la page des projets IA
- Ajout des liens vers la documentation des projets
- Ajout d'une section Technologies Utilisées pour chaque projet

### Modifié
- Mise à jour du style des badges de statut (vert pour les projets terminés)
- Amélioration de l'organisation des informations des projets

## [0.3.0] - 2024-03-08

### Ajouté
- Section IA enrichie avec :
  - Projet principal de génération d'images IA
  - Ressources de génération d'images
  - Outils de génération de vidéos
  - Solutions de création d'avatars
  - Liste des assistants IA
  - Tutoriels et ressources d'apprentissage
- Interface utilisateur améliorée avec :
  - Cards Material-UI
  - Accordéons pour l'organisation
  - Icônes thématiques
  - Liens externes fonctionnels

## [0.2.0] - 2024-03-07

### Ajouté
- Section 3D Printing enrichie avec :
  - Interface de contrôle de l'imprimante
  - Sites de modèles 3D
  - Tutoriels vidéo
  - Section équipement (caméra, smart pad)
  - Projets (Star Wars, véhicules, figurines)
  - Projet spécial DragonBlade
- Organisation du contenu en accordéons pour une meilleure lisibilité
- Liens externes vers les ressources

## [0.1.0] - 2024-03-07

### Ajouté
- Configuration initiale du projet avec Vite et TypeScript
- Mise en place de la structure de base du site
- Création des composants principaux :
  - Barre de navigation responsive
  - Page d'accueil avec présentation
  - Section Experts IA (structure)
  - Section Impression 3D (structure)
  - Page d'administration (structure)
- Installation et configuration de Material-UI
- Configuration de base pour Firebase
- Mise en place du routage avec React Router
- Thème de base avec Material-UI

### À venir
- Configuration complète de Firebase
- Système d'authentification fonctionnel
- Système de commentaires
- Contenu détaillé pour chaque section
- Déploiement sur Firebase Hosting

## [Unreleased]

### Ajouté
- Ajout d'un fichier exemple `firebase-config.example.js` pour faciliter la configuration Firebase
- Instructions détaillées dans le README pour la configuration Firebase

### Modifié
- Mise à jour de la version de firebase-tools à 12.4.0 pour la stabilité
- Amélioration de la documentation sur la gestion des secrets

### Sécurité
- Ajout de mesures de sécurité supplémentaires pour la gestion des clés API Firebase
- Mise à jour du `.gitignore` pour exclure les fichiers de configuration sensibles
