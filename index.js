const { pool } = require('./db');
const express = require('express');

const app = express();




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
async function insertData(anName, yPub, rate, epis, genre) {
    try {
        const res = await pool.query(

            `INSERT INTO Anime (anime_name,year_published,rate,episodes,genre) values('${anName}','${yPub}' ,${rate},${epis},'${genre}');`);
        return 1;
    }
    catch (error) {
        return 0;
    }


}


async function retrieveData() {
    try {
        const res = await pool.query(

            "select An.Anime_name, An.year_published, An.genre ,An.rate ,An.episodes, Au.auhor_name, ST.Studio_name   from Anime as An, Author as Au, Anime_Studio as ST  where An.author_id= Au.id and An.studio_id= St.id")
        return res.rows;
    }
    catch (error) {
        console.error(error);
    }


}