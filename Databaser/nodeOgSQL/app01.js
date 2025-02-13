const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("bil.db");

const PORT = 3000;

// Eksempel på å hente brukarar frå databasen (besøk http://localhost:3000/personer)
app.get("/personer", (req, res) => {
    const users = db.prepare("SELECT * FROM person").all();
    res.json(users);
});

app.get("/postadresser", (req, res) => {
    const users = db.prepare("SELECT * FROM postadresse").all();
    res.json(users);
});

app.get("/biler", (req, res) => {
    const users = db.prepare("SELECT * FROM bil").all();
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server køyrer: http://localhost:${PORT}`);
});