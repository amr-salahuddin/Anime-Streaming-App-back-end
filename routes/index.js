var express = require('express');
var router = express.Router();
const { pool } = require('./db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});





router.get('/about', (req, res) => {

    retrieveData().then(data => {
        res.json(data);

    })


});
router.post('/insert', (req, res, next) => {
    let pars = req.body;
    insertData(pars.anName, pars.yPub, pars.rate, pars.epis, pars.genre).then(data => {
        res.json(data);
    });



});

module.exports = router;

//___

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

