# Test Technique : Alphabet Fa Generator

Ce projet est une application web full-stack développée dans le cadre d'un test technique. Elle permet de tirer aléatoirement un signe du Fa (système géomantique), d'afficher sa description issue d'un fichier JSON et de récupérer une prescription associée stockée dans une base de données SQLite.

## Fonctionnalités
- **Générateur aléatoire** : Tirage d'un signe parmi les 16 principaux signes du Fa.
- **Architecture API** : Backend Node.js avec Express.
- **Base de données** : Intégration de SQLite pour la gestion des prescriptions (Bonus 1).
- **Frontend Dynamique** : Interface interactive en HTML/CSS/JS pur (sans framework).
- **Anti-cache** : Système de "cache-busting" pour garantir la fraîcheur des données à chaque tirage.

## Stack Technique
- **Backend** : Node.js, Express
- **Base de données** : SQLite3
- **Frontend** : HTML5, CSS3, JavaScript (Fetch API)
- **Gestion de version** : Git

## Structure du projet
```text
Test_Zili/
├── public/                 # Fichiers statiques
│   ├── pages/
│   │   └── index.html      # Interface utilisateur
│   └── style/
│       └── style.css       # Design de l'application
├── server.js               # Serveur API Express
├── init-db.js              # Script d'initialisation de la BDD SQLite
├── signes.json             # Source de données des signes
├── prescriptions.db        # Base de données SQLite (générée)
├── package.json            # Dépendances Node.js
└── README.md               # Documentation
```

## Installation et Lancement

### 1. Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### 2. Installation des dépendances
Clonez le dépôt et installez les modules nécessaires :
```bash
npm install
```

### 3. Initialisation de la base de données
Avant de lancer le serveur, créez et remplissez la base de données SQLite :
```bash
node init-db.js
```

### 4. Lancement du serveur
Démarrez l'application :
```bash
node server.js
```
L'application sera accessible sur : `http://localhost:3000/pages/index.html`

## 🔗 API Endpoints
- **GET** `/fa/random` : Retourne un signe aléatoire avec son nom, sa description et sa prescription.
- **Optionnel** : `/fa/random?n=X` : Permet de retourner une liste de X signes.

## 👤 Auteur
**Assoumou Alo'o**

