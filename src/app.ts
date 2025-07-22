// const express = require('express');
import express from 'express';
import 'dotenv/config';

import webRoutes from './routes/web';

const app = express();
const PORT = process.env.port || 8080;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

webRoutes(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    console.log(__dirname + '/views');
})