# Luxury Watch

**Luxury Watch** est un site e-commerce de vente de montres de luxe développé dans le cadre d'un stage de fin de formation de développeur web. Il permet aux utilisateurs de consulter et acheter des montres de luxe, de gérer leur panier et leurs commandes, et offre une interface d'administration complète.

**Site en production** : [cheerful-pika-4908ba.netlify.app](https://cheerful-pika-4908ba.netlify.app)

---

## Stack technique

**Backend :**

- Node.js + Express
- MySQL / MariaDB
- Argon2 (hashage des mots de passe)
- JWT + Cookies httpOnly (authentification)
- Cloudinary (stockage des images)
- Nodemailer / Brevo (envoi d'emails)

**Frontend :**

- React + Vite
- Bootstrap 5
- Axios
- React Hook Form

**Déploiement :**

- Always Data (backend)
- Netlify (frontend)
- GitHub (gestion de version)

---

## Prérequis

- Node.js >= 18
- npm
- MySQL

---

## Installation en local

### 1. Cloner le repo

```bash
git clone https://github.com/Maximedarrigade/luxury_watch.git
cd luxury_watch
```

### 2. Installer les dépendances backend

```bash
cd BACKEND
npm install
```

### 3. Installer les dépendances frontend

```bash
cd FRONTEND
npm install
```

---

## Variables d'environnement

Créer un fichier `.env` dans le dossier `BACKEND` :

```env
PORT=5000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=testMomo

# JWT
JWT_SECRET=ta_clé_secrète
JWT_EXPIRES_IN=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=ton_cloud_name
CLOUDINARY_API_KEY=ton_api_key
CLOUDINARY_API_SECRET=ton_api_secret

# Brevo SMTP
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=ton_user
BREVO_SMTP_PASS=ton_password
```

Créer un fichier `.env` dans le dossier `FRONTEND` :

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Démarrer le projet

### Backend

```bash
cd BACKEND
npm run dev
```

Le serveur tourne sur `http://localhost:5000`

### Frontend

```bash
cd FRONTEND
npm run dev
```

Le site tourne sur `http://localhost:5173`

---

## Fonctionnalités

**Utilisateur :**

- Inscription avec vérification email
- Connexion / Déconnexion sécurisée (JWT + cookies httpOnly)
- Consultation des montres et des marques
- Recherche avec autocomplétion
- Ajout au panier et passage de commande
- Historique des commandes

**Administrateur :**

- Ajout, modification et suppression de montres
- Ajout, modification et suppression de marques
- Gestion des commandes avec mise à jour du statut

---

## Structure du projet

```
luxury_watch/
├── BACKEND/
│   └── src/
│       ├── config/         # Configuration DB, Cloudinary, env
│       ├── controllers/    # Logique métier
│       ├── middleware/      # Auth, erreurs, upload, validation
│       ├── models/         # Requêtes SQL
│       ├── routes/         # Définition des routes
│       ├── schemas/        # Validation Zod
│       ├── services/       # Cloudinary, Mailer
│       ├── app.js
│       └── server.js
└── FRONTEND/
    └── src/
        ├── api/            # Axios + appels API
        ├── auth/           # Pages Login, Register
        ├── components/     # Composants réutilisables
        ├── context/        # AuthContext, CartContext
        ├── hooks/          # useAuth
        ├── pages/          # Toutes les pages
        └── routes/         # PrivateRoute, AdminRoute
```

---

## Déploiement

**Backend sur Always Data :**

```bash
cd ~/luxury_watch
git pull origin main
```

**Frontend sur Netlify :**

Le déploiement est automatique à chaque `git push` sur la branche `main`.

---

## Auteur

**Maxime Darrigade** — Projet de fin de formation développeur web