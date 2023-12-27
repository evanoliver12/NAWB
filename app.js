const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let userNotes = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/signin', (req, res) => {
  const username = req.body.username;
  userNotes[username] = userNotes[username] || [];
  res.redirect('/dashboard?username=' + encodeURIComponent(username));
});

app.get('/dashboard', (req, res) => {
  const username = req.query.username;
  const notes = userNotes[username] || [];
  res.send(`<h1>Welcome, ${username}!</h1><textarea id="journal">${notes.join('\n')}</textarea><script src="/script.js"></script>`);
});

app.post('/saveNote', (req, res) => {
  const username = req.body.username;
  const note = req.body.note;
  userNotes[username] = userNotes[username] || [];
  userNotes[username].push(note);
  res.sendStatus(200);
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
