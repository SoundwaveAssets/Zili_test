const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose(); // <-- Import de SQLite

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. CONNEXION À LA BASE DE DONNÉES
const db = new sqlite3.Database('./prescriptions.db', (err) => {
    if (err) console.error("Erreur d'ouverture de la BDD:", err);
});

let signes = [];
try {
    const rawData = fs.readFileSync(path.join(__dirname, 'signes.json'));
    signes = JSON.parse(rawData);
} catch (error) {
    console.error("Fichier signes.json introuvable.");
}

app.get('/fa/random', (req, res) => {
    try {
        if (signes.length === 0) {
            return res.status(500).json({ erreur: "Données indisponibles (Erreur 500)" });
        }

        let n = 1;
        if (req.query.n) {
            n = parseInt(req.query.n);
            if (isNaN(n) || n < 1 || n > signes.length) n = 1;
        }

        const signesMelanges = [...signes].sort(() => 0.5 - Math.random());
        const selection = signesMelanges.slice(0, n);

        const noms = selection.map(s => s.nom);
        const placeholders = noms.map(() => '?').join(',');

        // 2. UTILISATION DE LA BDD : On va chercher les prescriptions correspondantes en SQL !
        db.all(`SELECT signe_nom, texte FROM prescriptions WHERE signe_nom IN (${placeholders})`, noms, (err, rows) => {
            if (err) {
                console.error("Erreur SQL:", err);
                return res.status(500).json({ erreur: "Erreur BDD" });
            }

            // On fusionne le JSON et la base de données
            const resultats = selection.map(signe => {
                const prescription = rows.find(r => r.signe_nom === signe.nom);
                return {
                    signe: signe.nom,
                    description: signe.description,
                    // C'est ici que la donnée SQLite est injectée :
                    prescription: prescription ? prescription.texte : "Aucune prescription."
                };
            });

            if (req.query.n) res.json(resultats);
            else res.json(resultats[0]);
        });

    } catch (error) {
        res.status(500).json({ erreur: "Erreur interne" });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur actif : http://localhost:${PORT}`);
});