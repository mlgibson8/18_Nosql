const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');
//const env = require('dotenv').config();

const cwd = process.cwd();
const user = require('./models/user');
const { env } = require('process');
mongoose.connect('mongodb://localhost/socialDB')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`cwd: ${cwd}`);
    });
    });