# My Digital League MDS Grenoble

Projet LAN de MyDigitalSchool Grenoble - My Digital League.

Ce dépôt contient une application [Next.js](https://nextjs.org) initialisée avec [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sommaire

- [Prérequis](#prerequis)
- [Installation](#installation)
- [Demarrage](#demarrage)
- [Structure du projet](#structure-du-projet)
- [Conventions de code](#conventions-de-code)
- [Contribution](#contribution)

## Documentation technique

### 📊 Démarrer ici

- **[Audit Summary](docs/AUDIT_SUMMARY.md)** — État du projet, recommandations prioritaires

### Backend

- [Backend Guide](docs/BACKEND_GUIDE.md) — Guide complet du développement backend
- [Architecture Backend](docs/BACKEND_ARCHITECTURE.md) — Endpoints, patterns, auth
- [Schéma Base de Données](docs/DATABASE_SCHEMA.md) — Modèles Prisma et relations

### Frontend

- [Frontend Guide](docs/FRONTEND_GUIDE.md) — Patterns et best practices (👈 start here!)
- [Architecture Frontend](docs/FRONTEND_ARCHITECTURE.md) — Structure, composants, standards
- [Quick Wins](docs/FRONTEND_QUICK_WINS.md) — Tâches de refactoring rapides

### Général

- [Authentification](docs/authentication.md)
- [Tech Stack](docs/TECH_STACK.md) — Dépendances et configuration

## Prérequis

- Installer la version de Node.js indiquée dans le fichier `.nvmrc` ou utiliser une version récente :

```bash
nvm install
nvm use
```

## Installation

1. Clonez le dépôt :

- `git clone <url-du-depot>`

2. Accédez au dossier du projet :

- `cd my-digital-league-mds-grenoble`

3. Installez les dépendances :

- `npm install`

4. Copiez le fichier `.env.example` en `.env` et configurez vos variables d'environnement.
5. Générez le client Prisma :

- `npm run db:generate`

## Demarrage

- En développement : `npm run dev` pour lancer le serveur de développement.
- En développement : `npm run lint` pour vérifier le style de code avec ESLint.
- En dévelopement : `npm run storybook` pour lancer Storybook et visualiser les composants.
- En production : `npm run build` pour construire l'application.
- En production : `npm start` pour démarrer le serveur en production.

## Structure du projet

- Racine du projet
  - eslint.config.mjs : configuration ESLint
  - next-env.d.ts : déclarations de types Next.js
  - next.config.ts : configuration Next.js
  - package.json : dépendances et scripts
  - README.md : documentation
  - tsconfig.json : configuration TypeScript
  - vitest.config.ts : configuration Vitest
  - vitest.shims.d.ts : déclarations de types Vitest

- app/
  - layout.tsx : mise en page principale
  - page.module.scss : styles de la page principale
  - page.tsx : page d'accueil
  - components/
    - Example/
      - Example.module.scss : styles du composant d'exemple
      - Example.stories.tsx : stories Storybook
      - Example.tsx : composant d'exemple (architecture)
  - login/
    - page.module.scss : styles de la page de connexion
    - page.tsx : page de connexion

- styles/
  - globals.scss : styles globaux
  - reset.scss : reset CSS
  - utilities.scss : classes utilitaires
  - variables.scss : variables SCSS

- public/ : fichiers statiques

## Conventions de code

- ESLint pour le style de code.
- Prettier pour le formatage (Format on Save activé).
- PascalCase pour les composants et leurs fichiers.
- kebab-case pour les dossiers de routes/pages (ex. app/ma-page).
- camelCase pour les variables et fonctions.
- Modules SCSS pour les styles.
- Nommage de branches : feat/ma-fonctionnalite, fix/mon-correctif, refactor/, chore/, docs/, style/, test/.

## Contribution

1. Créez une branche : `git checkout -b ma-fonctionnalite`
2. Faites vos modifications et validez : `git commit -m "Ajout d'une nouvelle fonctionnalite"`
3. Poussez votre branche : `git push origin ma-fonctionnalite`
4. Ouvrez une pull request.
