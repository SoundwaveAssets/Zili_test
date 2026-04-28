const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'prescriptions.db'));

const prescriptionsData = [
    { nom: "Eji Ogbe", texte: "Méditez sur vos nouveaux départs et gardez l'esprit ouvert." },
    { nom: "Oyeku Meji", texte: "Prenez du recul et évitez les décisions hâtives dans l'obscurité." },
    { nom: "Iwori Meji", texte: "Cherchez la sagesse cachée et suivez le courant de votre intuition." },
    { nom: "Odi Meji", texte: "Protégez vos secrets mais ne vous isolez pas de vos proches." },
    { nom: "Irosun Meji", texte: "Soyez attentif aux messages et aux révélations autour de vous." },
    { nom: "Owonrin Meji", texte: "Agissez avec justesse, le moment de prendre une décision est venu." },
    { nom: "Obara Meji", texte: "Cultivez vos relations, une rencontre importante se prépare." },
    { nom: "Okanran Meji", texte: "Méfiez-vous des apparences trompeuses et restez authentique." },
    { nom: "Ogunda Meji", texte: "Affrontez vos obstacles avec courage, mais sans agressivité." },
    { nom: "Osa Meji", texte: "Acceptez les changements brusques comme une libération." },
    { nom: "Ika Meji", texte: "Faites preuve d'humilité et reconnaissez vos propres limites." },
    { nom: "Oturupon Meji", texte: "La patience sera votre meilleure alliée pour surmonter cette épreuve." },
    { nom: "Otura Meji", texte: "Honorez votre passé et appuyez-vous sur votre expérience." },
    { nom: "Irete Meji", texte: "La mort, la renaissance, le cycle." },
    { nom: "Ose Meji", texte: "Célébrez vos petites victoires et partagez votre joie." },
    { nom: "Ofun Meji", texte: "Préparez-vous à franchir un cap important de votre vie." }
];

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS prescriptions");
    db.run(`CREATE TABLE prescriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        signe_nom TEXT,
        texte TEXT
    )`);

    const stmt = db.prepare("INSERT INTO prescriptions (signe_nom, texte) VALUES (?, ?)");
    prescriptionsData.forEach(p => {
        // .trim() retire les espaces invisibles
        stmt.run(p.nom.trim(), p.texte);
        console.log(`Insertion réussie : ${p.nom.trim()}`);
    });
    stmt.finalize(() => {
        console.log("--- BASE DE DONNÉES PRÊTE ET REMPLIE ---");
        db.close();
    });
});