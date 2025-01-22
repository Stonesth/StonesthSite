# StonesthSite - Documentation Technique

Site personnel présentant mes projets en IA, LLMs, impression 3D et gestion de recettes.

## Nouvelles fonctionnalités (22/01/2025)
- Système de gestion des listes de courses
- Système de suivi des réalisations de recettes
- Navigation améliorée entre les pages

## Prérequis

- Node.js v18, v20 ou v22 (Firebase Tools n'est pas compatible avec Node.js v23)
- npm
- Python 3.x

## Technologies utilisées

- React + TypeScript
- Vite
- Material-UI
- Firebase (Authentication & Database)
- React Router

## Structure du projet

```
src/
├── components/     # Composants réutilisables
├── config/        # Configuration (Firebase, etc.)
├── pages/         # Pages de l'application
├── hooks/         # Hooks personnalisés
├── services/      # Services (API, Firebase, etc.)
└── utils/         # Utilitaires et helpers
```

## Configuration

### Variables d'environnement
Pour faire fonctionner l'application, vous devez configurer les variables d'environnement suivantes :

1. Créez un fichier `.env` à la racine du projet (ce fichier ne sera pas versionné)
2. Ajoutez les variables suivantes :

```bash
YOUTUBE_API_KEY=votre_clé_api_youtube
```

⚠️ Ne jamais commiter de fichiers contenant des clés API ou des mots de passe dans le dépôt Git.

## Configuration Firebase

Pour configurer Firebase dans votre environnement local :

1. Copiez le fichier exemple de configuration :
```bash
cp src/config/firebase-config.example.js src/config/firebase-config.js
```

2. Modifiez le fichier `firebase-config.js` avec vos propres informations Firebase :
   - Remplacez `YOUR_API_KEY` par votre clé API
   - Remplacez `YOUR_AUTH_DOMAIN` par votre domaine d'authentification
   - Remplacez `YOUR_PROJECT_ID` par votre ID de projet
   - Remplacez `YOUR_STORAGE_BUCKET` par votre bucket de stockage
   - Remplacez `YOUR_MESSAGING_SENDER_ID` par votre ID d'expéditeur de messages
   - Remplacez `YOUR_APP_ID` par votre ID d'application

> **Note de sécurité** : Le fichier `firebase-config.js` contient des informations sensibles et est ignoré par Git. Ne le committez jamais dans le dépôt.

## Installation et Développement

1. Clonez le repository
2. Installez les dépendances :
```bash
npm install
pip install -r requirements.txt
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

### Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run deploy` : Déploie l'application sur Firebase Hosting

## Déploiement

> **Important** : Avant de déployer, assurez-vous de construire l'application en exécutant :
> ```bash
> npm run build
> ```

Pour déployer le site :

> **Note** : La commande suivante n'est nécessaire que lors de la première configuration. Vous n'avez pas besoin de l'exécuter à chaque déploiement.

```bash
npm install firebase-tools@12.4.0
```

Déployez le site :
```bash
npx firebase-tools deploy --only hosting
```

Le site sera déployé à l'URL : https://monsite-5f920.web.app

## Développement

### Composants

Les composants sont organisés de manière modulaire dans le dossier `components/`. Chaque composant doit :
- Avoir son propre fichier
- Utiliser TypeScript pour le typage
- Être documenté avec des commentaires JSDoc

### Pages

Les pages sont dans le dossier `pages/` et représentent les différentes routes de l'application. Chaque page :
- Est un composant React
- Peut utiliser des composants du dossier `components/`
- Gère sa propre logique métier

### Services

Les services dans le dossier `services/` encapsulent la logique d'accès aux données et aux API externes :
- Firebase (authentification, base de données)
- YouTube API
- Autres services externes

## Changements récents

- Mise à jour du menu de navigation pour le rendre visible lors du défilement de la page, repositionné sous le titre "Mes Projets IA".
- Ajout d'un nouveau menu de navigation pour améliorer l'expérience utilisateur.
- Modification de la disposition du menu de navigation pour une meilleure accessibilité.

## Sécurité
- Toutes les clés API et informations sensibles doivent être stockées dans des variables d'environnement
- Les fichiers de configuration sensibles sont exclus du versionnement Git
