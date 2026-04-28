const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database(path.join(__dirname, 'prescriptions.db'));

// Lecture du JSON avec chemin absolu
const signes = JSON.parse(fs.readFileSync(path.join(__dirname, 'signes.json'), 'utf8'));

app.get('/fa/random', (req, res) => {
    const randomSigne = signes[Math.floor(Math.random() * signes.length)];
    const sql = "SELECT texte FROM prescriptions WHERE LOWER(TRIM(signe_nom)) = LOWER(TRIM(?))";

    db.get(sql, [randomSigne.nom], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Erreur BDD" });
        }

        const response = {
            signe: randomSigne.nom,
            description: randomSigne.description,
            prescription: row ? row.texte : "Aucune prescription trouvée."
        };

        res.json(response);
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});