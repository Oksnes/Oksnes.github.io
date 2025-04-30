const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('better-sqlite3')('chatsite.db'); // Oppretter eller åpner en SQLite-database

const app = express();
const PORT = 3000;

// Middleware for å parse JSON og URL-encoded data
app.use(express.static("public"));
app.use(express.json());

// Middleware for å håndtere sessions
app.use(session({
  secret: 'supersecretkey', // Endre denne til en sterk hemmelighet i produksjon
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Sett til true hvis du bruker HTTPS
}));

function kreverInnlogging(req, res, next) {
  if (!req.session.bruker) { //Se om bruker er logget inn
      return res.redirect("/login.html"); //send til login siden hvis du ikke er logget inn
  }
  next();
}

app.post("/registrerBruker", async (req, res) => { //rute for å registrere ny bruker
  const {BrukerNavn, Passord, EPost, ProfilBilde} = req.body; //hente dataen fra regisrer.html

  // Hash passordet med bcrypt
  const saltRounds = 10; // Antall runder med hashing
  const hashPassord = await bcrypt.hash(Passord, saltRounds);

  const stmt = db.prepare("INSERT INTO Bruker (BrukerNavn, Passord, EPost, ProfilBilde ) VALUES (?, ?, ?, ?)"); //sende inn brukeren til databasen
  const info = stmt.run(BrukerNavn, hashPassord, EPost, ProfilBilde ); //infoen til å send inn

  res.json({ message: "Ny bruker lagt til", info }); //statusmelding
});

app.post ("/oppdaterBruker", async (req, res) => {
  const BrukerID = req.session.bruker.id; // Hent bruker-ID fra session
  const {BrukerNavn, Passord, EPost, ProfilBilde} = req.body; //info fra dashboard.html

  // Hash passordet med bcrypt
  const saltRounds = 10; // Antall runder med hashing
  const hashPassord = await bcrypt.hash(Passord, saltRounds);

  const stmt = db.prepare("UPDATE Bruker SET BrukerNavn = ?, Passord = ?, EPost = ?, ProfilBilde = ? WHERE BrukerID = ?"); //oppdaterer brukerifoen basert på brukerID-en til personen som er logget inn
  const info = stmt.run(BrukerNavn, hashPassord, EPost, ProfilBilde, BrukerID);

  res.json({ message: "Bruker oppdatert"});
});

// Rute for innlogging
app.post ("/login", async (req, res) => {
  const { BrukerNavn, Passord } = req.body; //data fra login.html

  const bruker = db.prepare("SELECT * FROM bruker WHERE BrukerNavn = ?").get(BrukerNavn); //Ser I databasen for brukeren jeg prøver å logge meg inn som
  if (!bruker) { //Om brukeren ikke finnes i databasen
      return res.status(401).json({ message: "Feil Brukernavn eller passord" });
  }

  const passordErGyldig = await bcrypt.compare(Passord, bruker.Passord); //Ser om passordet du skriver er det samme som er kryptert i databasen
  if (!passordErGyldig) { //om passordet ikke stemmer
      return res.status(401).json({ message: "Feil Brukernavn eller passord" });
  }

  // Lagre brukerdata i session
  req.session.bruker = { id: bruker.BrukerID, brukernavn: bruker.BrukerNavn }; //gir sessionene din disse dataene
  res.json({ message: "Innlogging vellykket" });
});

// Rute for å logge ut
app.post("/logout", (req, res) => { //DENNE KODEN BRUKER JEG IKKE NÅ
  req.session.destroy(); //stopper sessionen
  res.json({ message: "Du er logget ut" });
});

// Rute for å vise chat.html eller admin (kun for innlogga brukarar)
app.get("/dashboard", kreverInnlogging,(req, res) => { 
  const BrukerID = req.session.bruker.id;
  const admin = db.prepare('SELECT * FROM Bruker WHERE BrukerID = ?').get(BrukerID) // Hent admin-status fra databasen
  if (admin.Admin == "true") {
    res.sendFile(__dirname + "/beskyttet/admin.html"); // Hvis brukeren er admin, send dem til admin-siden
  } else {
    return res.redirect("/chat.html"); // Ellers send dem til chat-siden
  }
});

//Hjelp av copilot og Jo Bjørnar V2 under
//Hjelp av copilot og Jo Bjørnar V2 under
//Hjelp av copilot og Jo Bjørnar V2 under

app.post('/Rom', (req, res) => {
  const { Navn } = req.body;
  const stmt = db.prepare('INSERT INTO Rom (Navn) VALUES (?)');
  stmt.run(Navn);
  res.sendStatus(200);
});

app.get('/Rom', (req, res) => {
  const stmt = db.prepare('SELECT * FROM Rom');
  const Rom = stmt.all();
  res.json(Rom);
});

app.post('/Rom/:RomID/Meldinger', (req, res) => {
  const BrukerID = req.session.bruker?.id; // Hent bruker-ID fra session
  const { Innhold, BildeURL } = req.body; // Hent tekst og bilde-URL fra forespørselen
  const { RomID } = req.params;

  if (!BrukerID || !RomID || (!Innhold && !BildeURL)) {
    return res.status(400).json({ message: "Manglende data for å sende melding" });
  }

  const stmt = db.prepare('INSERT INTO Meldinger (BrukerID, RomID, Innhold, BildeURL) VALUES (?, ?, ?, ?)');
  stmt.run(BrukerID, RomID, Innhold || null, BildeURL || null);

  res.sendStatus(200);
});

app.get('/Rom/:RomID/Meldinger', (req, res) => {
  const { RomID } = req.params;

  const stmt = db.prepare(`
    SELECT Meldinger.Innhold, Meldinger.BildeURL, Bruker.BrukerNavn, Bruker.ProfilBilde
    FROM Meldinger
    JOIN Bruker ON Meldinger.BrukerID = Bruker.BrukerID
    WHERE Meldinger.RomID = ?
  `);
  const meldinger = stmt.all(RomID);

  res.json(meldinger);
});

app.get('/admin/hentBrukere', (req, res) => {
  const stmt = db.prepare('SELECT BrukerID, BrukerNavn, EPost FROM Bruker');
  const brukere = stmt.all();
  res.json(brukere);
});

app.delete('/admin/slettBruker/:BrukerID', (req, res) => {
  const { BrukerID } = req.params;

  // Slett meldingene til brukeren
  const deleteMessagesStmt = db.prepare('DELETE FROM Meldinger WHERE BrukerID = ?');
  deleteMessagesStmt.run(BrukerID);

  // Slett brukeren
  const deleteUserStmt = db.prepare('DELETE FROM Bruker WHERE BrukerID = ?');
  const result = deleteUserStmt.run(BrukerID);

  if (result.changes > 0) {
    res.json({ message: 'Bruker og meldinger slettet' });
  } else {
    res.status(404).json({ message: 'Bruker ikke funnet' });
  }
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Serveren kjører på http://localhost:${PORT}`);
});