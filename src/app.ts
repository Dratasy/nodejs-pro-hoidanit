// const express = require('express');
import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.port || 8080;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/hoidanit', (req, res) => {
    res.send('Hello hoidanit!');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    console.log(__dirname + '/views');
})