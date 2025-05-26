const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle all routes by serving index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve learn.html directly for the learn route
app.get('/learn', (req, res) => {
    res.sendFile(path.join(__dirname, 'learn.html'));
});

app.get('/progress', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s by redirecting to home
app.use((req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});