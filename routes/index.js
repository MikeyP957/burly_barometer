const route = require('express').Router();
const path = require('path');

route.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

route.get('/stats', (req, res) => {
    
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = route;

