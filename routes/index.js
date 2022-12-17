var express = require('express');
var router = express.Router();
var ANIME = require('../models/Anime.js');
var AUTHOR = require('../models/Author.js');
const SINGER = require('../models/Singer.js');
const NEWS = require('../models/news.js');
const STUDIO = require('../models/Studio.js');
const VA = require('../models/va.js');
const EPISODE = require('../models/episode.js');

const CHARACTER = require('../models/character.js');
const ANIMEAWARDS = require('../models/AnimeAwards.js');
const COMMENT = require('../models/comment.js');
const USER = require('../models/user.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


var anime = new ANIME();
var comment = new COMMENT();
var user = new USER();

var news = new NEWS();

var author = new AUTHOR();
var singer = new SINGER();
var studio = new STUDIO();
var va = new VA();
var character = new CHARACTER();
var anime = new ANIME();
var episode = new EPISODE();
var animeaward = new ANIMEAWARDS();

//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------

function getCurDateForInsertion() {

    let date = new Date();

    let ret = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return ret;
}
router.get('/anime_list', (req, res) => {

    anime.anime_list().then(data => {
        res.json(data);

    })


});
router.get('/anime_details', (req, res) => {

    anime.anime_details(req.query.animeId).then(data => {
        res.json(data);

    })


});

router.post('/insert/anime', (req, res, next) => {
    let pars = req.body;
    anime.insertAnime(pars.animeName, pars.authorId, pars.studioId, pars.singerId, pars.genre, pars.rate, pars.episodes, pars.yearPub, pars.imgLink).then(data => {
        res.json(data);
    });



});

router.post('/update/anime', (req, res, next) => {
    let pars = req.body;
    anime.updateAnime(pars.animeName, pars.authorId, pars.studioId, pars.singerId, pars.genre, pars.rate, pars.episodes, pars.yearPub, pars.imgLink, pars.animeId).then(data => {
        res.json(data);
    });
});

router.post('/delete/anime', (req, res, next) => {
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
    author.selectAuthorByAnime(pars.animeId).then(data => {
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

router.post('/update/author', (req, res, next) => {
    let pars = req.body;
    author.updateAuthor(pars.authorName, pars.birthDate, pars.yearsActive, pars.animeGenre, pars.imgLink, pars.authorId).then(data => {
        res.json(data);
    });
});

router.post('/delete/author', (req, res, next) => {
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
    singer.selectSingerByAnime(pars.animeId).then(data => {
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

router.post('/update/singer', (req, res, next) => {
    let pars = req.body;
    singer.updateSinger(pars.singerName, pars.birthDate, pars.imgLink, pars.singerId).then(data => {
        res.json(data);
    });
});

router.post('/delete/singer', (req, res, next) => {
    let pars = req.body;
    singer.deleteSinger(pars.singerId).then(data => {
        res.json(data);
    });
});


module.exports = router;

//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------
//--------------------------------NEWS-------------------------------------------------------------

router.get('/select/allNews', (req, res) => {

    news.selectAllNews().then(data => {
        res.json(data);

    })


});

router.post('select/newsBy', (req, res) => {
    let pars = req.body;
    news.selectNewsBy(pars.animeId, pars.studioId, pars.characterId, pars.singerId, pars.authorId, pars.vaId).then(data => {
        res.json(data);

    })


});


router.post('delete/news', (req, res) => {
    let pars = req.body;
    news.deleteNews(newsId).then(data => {
        res.json(data);

    })


});

router.post('update/news', (req, res) => {
    let pars = req.body;
    news.updateNews(pars.link, pars.imgLink, pars.animeId, pars.studioId, pars.characterId, pars.singerId, pars.authorId, pars.vaId, getCurDateForInsertion(), pars.newsId).then(data => {
        res.json(data);

    })


});

router.post('insert/news', (req, res) => {
    let pars = req.body;
    news.insertNews(pars.link, pars.imgLink, pars.animeId, pars.studioId, pars.characterId, pars.singerId, pars.authorId, pars.vaId, getCurDateForInsertion()).then(data => {
        res.json(data);

    })


});




//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------


router.get('/select/studioByAnime', (req, res) => {
    let pars = req.query;
    studio.selectStudioByAnime(pars.animeId).then(data => {
        res.json(data);

    })


});
router.get('/select/allStudios', (req, res) => {
    studio.selectAllStudios().then(data => {
        res.json(data);

    })


});
router.post('/insert/studio', (req, res, next) => {
    let pars = req.body;
    studio.insertStudio(pars.studioName, pars.founder, pars.yearFounded).then(data => {
        res.json(data);
    });



});

router.post('/update/studio', (req, res, next) => {
    let pars = req.body;
    studio.updateStudio(pars.studioName, pars.founder, pars.yearFounded, pars.studioId).then(data => {
        res.json(data);
    });
});

router.post('/delete/studio', (req, res, next) => {
    let pars = req.body;
    studio.deleteStudio(pars.studioId).then(data => {
        res.json(data);
    });
});




//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------VA-------------------------------------------------------------//--------------------------------VA-------------------------------------------------------------
//--------------------------------VA-------------------------------------------------------------
//--------------------------------VA-------------------------------------------------------------
//--------------------------------VA-------------------------------------------------------------
//--------------------------------VA-------------------------------------------------------------



router.get('/select/va', (req, res) => {
    va.selectVA(req.query.vaId).then(data => {
        res.json(data);

    })


});

router.get('/select/allVAs', (req, res) => {
    va.selectAllVAs().then(data => {
        res.json(data);

    })


});
router.post('/insert/va', (req, res, next) => {
    let pars = req.body;
    va.insertVA(pars.vaName, pars.birthDate, pars.imgLink).then(data => {
        res.json(data);
    });



});

router.post('/update/va', (req, res, next) => {
    let pars = req.body;
    va.updateVA(pars.vaName, pars.birthDate, pars.imgLink, pars.vaId).then(data => {
        res.json(data);
    });
});

router.post('/delete/va', (req, res, next) => {
    let pars = req.body;
    va.deleteVA(pars.vaId).then(data => {
        res.json(data);
    });
});



//--------------------------------CHARACTER-------------------------------------------------------------//--------------------------------CHARACTER-------------------------------------------------------------
//--------------------------------CHARACTER-------------------------------------------------------------
//--------------------------------CHARACTER-------------------------------------------------------------
//--------------------------------CHARACTER-------------------------------------------------------------
//--------------------------------CHARACTER-------------------------------------------------------------




router.get('/select/allCharacters', (req, res) => {
    character.selectAllCharacters().then(data => {
        res.json(data);

    })


});

router.get('/select/characterByAnime', (req, res) => {

    character.characterByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/character', (req, res, next) => {
    let pars = req.body;
    character.insertCharacter(pars.characterName, pars.characterRole, pars.vaId, pars.animeId, pars.imgLink).then(data => {
        res.json(data);
    });



});

router.post('/update/character', (req, res, next) => {
    let pars = req.body;
    character.updateCharacter(pars.characterName, pars.characterRole, pars.vaId, pars.animeId, pars.imgLink, characterId).then(data => {
        res.json(data);
    });
});

router.post('/delete/character', (req, res, next) => {
    let pars = req.body;
    character.deleteCharacter(pars.characterId).then(data => {
        res.json(data);
    });
});



//--------------------------------EPISODE-------------------------------------------------------------//--------------------------------EPISODE-------------------------------------------------------------
//--------------------------------EPISODE-------------------------------------------------------------
//--------------------------------EPISODE-------------------------------------------------------------
//--------------------------------EPISODE-------------------------------------------------------------
//--------------------------------EPISODE-------------------------------------------------------------




router.get('/select/allEpisodes', (req, res) => {
    episode.selectAllEpisodes().then(data => {
        res.json(data);

    })


});

router.get('/select/episodeByAnime', (req, res) => {

    episode.episodeByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/episode', (req, res, next) => {
    let pars = req.body;
    episode.insertEpisode(pars.episodeNumber, pars.episodeLink, pars.animeId).then(data => {
        res.json(data);
    });



});

router.post('/update/episode', (req, res, next) => {
    let pars = req.body;
    episode.updateEpisode(pars.episodeNumber, pars.episodeLink, pars.old_episodeNumber, pars.animeId,).then(data => {
        res.json(data);
    });
});

router.post('/delete/episode', (req, res, next) => {
    let pars = req.body;
    episode.deleteEpisode(pars.episodeNumber, pars.animeId).then(data => {
        res.json(data);
    });
});



//--------------------------------ANIMEAWARD-------------------------------------------------------------//--------------------------------ANIMEAWARD-------------------------------------------------------------
//--------------------------------ANIMEAWARD-------------------------------------------------------------
//--------------------------------ANIMEAWARD-------------------------------------------------------------
//--------------------------------ANIMEAWARD-------------------------------------------------------------
//--------------------------------ANIMEAWARD-------------------------------------------------------------




router.get('/select/allAnimeAwards', (req, res) => {
    animeaward.selectAllAnimeAwards().then(data => {
        res.json(data);

    })


});

router.get('/select/animeAwardsByAnime', (req, res) => {

    animeaward.selectAwardsByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/animeaward', (req, res, next) => {
    let pars = req.body;
    animeaward.insertAnimeAward(pars.awardName, pars.animeId).then(data => {
        res.json(data);
    });



});

router.post('/update/animeaward', (req, res, next) => {
    let pars = req.body;
    animeaward.updateAnimeAward(pars.awardName, pars.animeId).then(data => {
        res.json(data);
    });
});

router.post('/delete/animeaward', (req, res, next) => {
    let pars = req.body;
    animeaward.deleteAnimeAward(pars.awardName, pars.animeId).then(data => {
        res.json(data);
    });
});



//--------------------------------COMMENT-------------------------------------------------------------//--------------------------------COMMENT-------------------------------------------------------------
//--------------------------------COMMENT-------------------------------------------------------------
//--------------------------------COMMENT-------------------------------------------------------------
//--------------------------------COMMENT-------------------------------------------------------------
//--------------------------------COMMENT-------------------------------------------------------------




router.get('/select/allComments', (req, res) => {
    comment.selectAllComments().then(data => {
        res.json(data);

    })


});

router.get('/select/commentsByAnime', (req, res) => {

    comment.selectCommentsByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/comment', (req, res, next) => {
    let pars = req.body;
    console.log(getCurDateForInsertion());
    comment.insertComment(pars.commentData, pars.userId, pars.animeId, getCurDateForInsertion()).then(data => {
        res.json(data);
    });



});

router.post('/update/comment', (req, res, next) => {
    let pars = req.body;
    comment.updateComment(pars.commentData, pars.userId, pars.animeId, getCurDateForInsertion(), pars.commentId).then(data => {
        res.json(data);
    });
});

router.post('/delete/comment', (req, res, next) => {
    let pars = req.body;
    comment.deleteComment(pars.commentId).then(data => {
        res.json(data);
    });
});


//--------------------------------USER-------------------------------------------------------------//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------




router.get('/select/allUsers', (req, res) => {
    user.selectAllUsers().then(data => {
        res.json(data);

    })


});

router.post('/insert/user', (req, res, next) => {
    let pars = req.body;
    console.log(getCurDateForInsertion());
    user.insertUser(pars.username, pars.password, pars.email, pars.userAttribute, getCurDateForInsertion()).then(data => {
        res.json(data);
    });



});

router.post('/update/user', (req, res, next) => {
    let pars = req.body;
    user.updateUser(pars.username, pars.password, pars.email, pars.userAttribute, pars.userId).then(data => {
        res.json(data);
    });
});

router.post('/delete/user', (req, res, next) => {
    let pars = req.body;
    user.deleteUser(pars.userId).then(data => {
        res.json(data);
    });
});

