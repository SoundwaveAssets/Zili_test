const express = require('express');
const cors = require('cors');
const signes = require('./signes.json');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//route de test 
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.json({message:"Bienvenue à vous"});
});
app.get('/fa/random', (req, res) => {
    try {
        //on selctionne un index aléatoire basé sur la longueur du tableau des signes
        const randomIndex = Math.floor(Math.random()*signes.length);
        const signeAleatoire = signes[randomIndex];

        // Renvoi de la réponse 
        res.json({
            signe: signeAleatoire.nom,
            description: signeAleatoire.description
        });
    } catch (error) {
        // Gestion basique d'une erreur 500
        console.error("Erreur de récupération:", error);
        res.status(500).json({ erreur: "Erreur interne du serveur" });
    }
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`démarrage réussi au http://localhost:${PORT}`);
});