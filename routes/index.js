var express = require('express');
var router = express.Router();
var ANIME = require('../models/Anime.js');
var AUTHOR = require('../models/Author.js');
const SINGER = require('../models/Singer.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


var anime = new ANIME();
var author = new AUTHOR();
var singer = new SINGER();

//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
router.get('/select/anime', (req, res) => {

    anime.selectAnime().then(data => {
        res.json(data);

    })


});
router.post('/insert/anime', (req, res, next) => {
    let pars = req.body;
    anime.insertAnime(pars.animeName, pars.authorId, pars.studioId, pars.singerId, pars.genre, pars.rate, pars.episodes, pars.yearPub, pars.imgLink).then(data => {
        res.json(data);
    });



});

router.put('/update/anime', (req, res, next) => {
    let pars = req.body;
    anime.updateAnime(pars.animeName, pars.authorId, pars.studioId, pars.singerId, pars.genre, pars.rate, pars.episodes, pars.yearPub, pars.imgLink, pars.old_animeName).then(data => {
        res.json(data);
    });
});

router.delete('/delete/anime', (req, res, next) => {
    let pars = req.body;
    anime.deleteAnime(pars.animeId).then(data => {
        res.json(data);
    });
});





//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------

router.get('/select/authorByAnime', (req, res) => {
    let pars = req.query;
    author.selectAuthorByAnime(pars.animeName).then(data => {
        res.json(data);

    })


});
router.get('/select/allAuthors', (req, res) => {
    author.selectAllAuthors().then(data => {
        res.json(data);

    })


});
router.post('/insert/author', (req, res, next) => {
    let pars = req.body;
    author.insertAuthor(pars.authorName, pars.birthDate, pars.yearsActive, pars.animeGenre, pars.imgLink).then(data => {
        res.json(data);
    });



});

router.put('/update/author', (req, res, next) => {
    let pars = req.body;
    author.updateAuthor(pars.authorName, pars.birthDate, pars.yearsActive, pars.animeGenre, pars.imgLink, pars.old_authorName).then(data => {
        res.json(data);
    });
});

router.delete('/delete/author', (req, res, next) => {
    let pars = req.body;
    author.deleteAuthor(pars.authorName).then(data => {
        res.json(data);
    });
});


//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------



router.get('/select/singerByAnime', (req, res) => {
    let pars = req.query;
    singer.selectSingerByAnime(pars.animeName).then(data => {
        res.json(data);

    })


});
router.get('/select/allSingers', (req, res) => {
    singer.selectAllSingers().then(data => {
        res.json(data);

    })


});
router.post('/insert/singer', (req, res, next) => {
    let pars = req.body;
    singer.insertSinger(pars.singerName, pars.birthDate, pars.imgLink).then(data => {
        res.json(data);
    });



});

router.put('/update/singer', (req, res, next) => {
    let pars = req.body;
    singer.updateSinger(pars.singerName, pars.birthDate, pars.imgLink, pars.old_singerName).then(data => {
        res.json(data);
    });
});

router.delete('/delete/singer', (req, res, next) => {
    let pars = req.body;
    singer.deleteSinger(pars.singerName).then(data => {
        res.json(data);
    });
});


module.exports = router;

//___