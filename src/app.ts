// const express = require('express');
import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send(`<h1 style="color: red;">Hello World update nodemon!<h1>`);
});

app.get('/hoidanit', (req, res) => {
    res.send('Hello hoidanit!');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    console.log(`port ${PORT}`);
})