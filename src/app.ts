// const express = require('express');
import express from 'express';

const app = express();
const PORT = 8080

app.get('/', (req, res) => {
    res.send('Hello World update nodemon!');
});

app.get('/hoidanit', (req, res) => {
    res.send('Hello hoidanit!');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})