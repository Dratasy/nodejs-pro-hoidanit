// const express = require('express');
import express from 'express';
import 'dotenv/config';

import webRoutes from 'routes/web';
import initDatabase from 'config/seed';
import passport from 'passport';
import configPassportLocal from './middleware/passport.local';
import session from 'express-session';
const app = express();
const PORT = process.env.port || 8080;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files: images/css/javascript
app.use(express.static('public'));

//config session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();

// config routes
webRoutes(app);

//seeding data
initDatabase();

//hanle 404 not found
app.use((req, res) => {
    res.status(404).send('404 not found');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})

