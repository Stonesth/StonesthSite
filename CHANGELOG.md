# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [0.5.1] - 2025-01-20

### Ajouté
- Nouveau composant Footer avec :
  - Affichage de la version de l'application
  - Lien vers les mentions légales
  - Copyright dynamique
- Composant Layout pour une structure commune à toutes les pages
- Page des mentions légales
- Structure de base pour l'affichage des informations légales

### Modifié
- Restructuration de l'application avec Layout commun
- Synchronisation de la version entre package.json et CHANGELOG.md

## [0.5.0] - 2025-01-20

### Ajouté
- Nouvelle interface d'administration sécurisée :
  - Système de connexion avec authentification Firebase
  - Page de connexion admin avec gestion des erreurs
  - Tableau de bord administrateur avec :
    - Vue d'ensemble des statistiques (visiteurs, articles, commentaires, utilisateurs)
    - Section d'actions rapides (création d'articles, gestion des médias, modération)
    - Historique d'activité récente
    - Interface responsive et moderne avec Material-UI
  - Protection des routes administratives
  - Gestion de la persistance de connexion

### Modifié
- Amélioration de la gestion des erreurs d'authentification
- Optimisation des messages d'erreur pour les utilisateurs avec bloqueurs de publicités

## [0.4.0] - 2025-01-04

### Ajouté
- Nouvelle section "Ressources & Conseils" :
  - Ajout d'un nouvel onglet dans la barre de navigation
  - Création de la page principale listant les ressources
  - Création de la page "Microsoft Office : quelle solution choisir ?" avec :
    - Comparaison détaillée des différentes options Microsoft Office
    - Information sur Office Famille 2024 (149€)
    - Section spéciale pour les étudiants avec recommandations adaptées
    - Information sur la version gratuite en ligne de Microsoft 365
    - Menu de navigation rapide vers les sections
    - Tableau comparatif des avantages
    - Liste des sources avec liens cliquables

### Modifié
- Ajout de la date de publication en haut de chaque page principale :
  - BlockchainEnergyAnalysis.tsx
  - Blockchain.tsx
  - AIProjects.tsx
  - AIExperts.tsx
  - 3DPrinting.tsx
  - TechYoutubers.tsx
  - Resources.tsx
  - MicrosoftOffice.tsx

## [0.3.9] - 2024-12-23

### Modifié
- Enrichissement de l'analyse énergétique Blockchain :
  - Ajout de nouveaux graphiques comparatifs
  - Intégration de données sur Bitcoin et les blockchains PoS
  - Ajout d'une section sur les blockchains PoS efficaces (Cardano, Ethereum 2.0, Polygon)
  - Amélioration de la présentation des données avec échelle logarithmique
  - Restructuration de l'analyse en sections distinctes

## [0.3.8] - 2024-12-24

### Modifié
- Refactoring de la section Blockchain :
  - Création d'une nouvelle page dédiée à l'analyse énergétique détaillée
  - Simplification de la page principale Blockchain avec un lien vers l'analyse
  - Ajout de nouvelles données comparatives sur la consommation énergétique
  - Amélioration de la présentation des données avec des tableaux et graphiques
  - Suppression des données relatives aux agences bancaires
  - Réduction de la taille des graphiques pour une meilleure lisibilité
  - Déplacement du lien Blockchain dans la barre de navigation avant Admin

## [0.3.7] - 2024-12-23

### Modifié
- Refactoring de la section Blockchain :
  - Création d'une nouvelle page dédiée à l'analyse énergétique détaillée
  - Simplification de la page principale Blockchain avec un lien vers l'analyse
  - Ajout de nouvelles données comparatives sur la consommation énergétique
  - Amélioration de la présentation des données avec des tableaux et graphiques

## [0.3.6] - 2024-12-22

### Ajouté
- Adresse email de contact (stonesth@gmx.fr) pour les retours sur la section Blockchain

## [0.3.5] - 2024-12-22

### Ajouté
- Nouvelle section Blockchain avec analyse comparative de la consommation énergétique
- Page dédiée aux sources et références pour la section Blockchain
- Graphiques interactifs pour la visualisation des données énergétiques
- Tableaux comparatifs détaillés
- Note de transparence sur l'utilisation de l'IA pour l'analyse

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
- Navigation vers la section Blockchain dans la barre de navigation

### Modifié
- Mise à jour de la version de firebase-tools à 12.4.0 pour la stabilité
- Amélioration de la documentation sur la gestion des secrets

### Sécurité
- Ajout de mesures de sécurité supplémentaires pour la gestion des clés API Firebase
- Mise à jour du `.gitignore` pour exclure les fichiers de configuration sensibles
