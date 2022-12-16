const { pool } = require('./db');
const express = require('express');

const app = express();
const anime = require('./models/Anime');



app.post('/about', (req, res) => {

    retrieveData().then(data => {
        res.json(data);

    })



});
app.post('/insert', (req, res, next) => {
    console.log(req.body)
    // let pars = req.body;
    // insertData(pars.anName, pars.yPub, pars.rate, pars.epis, pars.genre).then(data => {
    //     res.json(data);
    // });



});
