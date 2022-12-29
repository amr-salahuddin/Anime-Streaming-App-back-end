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
const FAVORITES = require('../models/favorites.js');
const WATCHLIST = require('../models/watchlist.js');

const SONG = require('../models/Song.js');
const BAN = require('../models/ban.js');
const ENQUIRIES = require('../models/enquiries.js');
const RATINGS = require('../models/ratings.js');

require('dotenv').config();

var user = new USER();


function getCurDateForInsertion() {

    let date = new Date();

    let ret = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return ret;
}

//PP

var jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { rows } = require('pg/lib/defaults.js');


//signup
router.post('/register', function (req, res) {
    let pars = req.body;

    user.insertUser(pars.username, pars.password, pars.email, 0, getCurDateForInsertion()).then(data => {
        res.json(data);

    })

});


//signin
router.post('/login', function (req, res) {
    let pars = req.body;
    let givenToken = (pars.Token);
    if (givenToken) {
        console.log('lol');
        var decodedToken = jwt.decode(givenToken);
        console.log(decodedToken);
        if (decodedToken === null)
            res.json({ "status": 0 });
        if (decodedToken['exp'] <= Date.now()) {
            let data = decodedToken['data'];
            console.log(decodedToken);
            let newToken = jwt.sign({ data }, '!@$@$%^&*()*&^%$#EDASCSDXsecret', { expiresIn: "1000000ms" })
            decodedToken['exp'] = Date.now();
            console.log('hi again');
            res.json({ "status": 1, "session_id": newToken, "user_id": data['user']['id'], "username": data['user']['username'], "account_type": data['user']['admin'] });
        }
        else res.json({ "status": 0 });
    }
    else {
        user.authenticateUser(pars.username, pars.password).then(data => {
            console.log('ss');
            if (data["STATUS"] == 0) {
                console.log('12312312');
                res.json({ "STATUS": 0 });

            }
            else {
                var token = jwt.sign({ data }, '!@$@$%^&*()*&^%$#EDASCSDXsecret', { expiresIn: "10000ms" });
                let decodedToken = jwt.decode(token);
                console.log('Decoded Token:', decodedToken);
                //res.json({ "status": 1, "session_id": token, "user": data['user'], "isBanned": data['banned'] > 0, "ban": data['ban'], "account_type": data['user']['admin'] });
                let banned = data['banned'];
                if (banned)
                    banned = 2;

                else banned = 1;
                res.json({ 'STATUS': banned, 'session_id': token, 'ban': data['ban'], 'user': data['user'] });
            }
        })
    }

});


///PP
//_____________________________

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


var anime = new ANIME();
var song = new SONG();
var ban = new BAN();

var favorites = new FAVORITES();
var watchlist = new WATCHLIST();


var comment = new COMMENT();

var news = new NEWS();
var enquiries = new ENQUIRIES();
var ratings = new RATINGS();

var author = new AUTHOR();
var singer = new SINGER();
var studio = new STUDIO();
var va = new VA();
var character = new CHARACTER();
var anime = new ANIME();
var episode = new EPISODE();
var animeaward = new ANIMEAWARDS();


function isAdmin(token) {
    let decodedToken = jwt.decode(token);
    let x = decodedToken['data']['user']['admin'];
    console.log(x);
    return x;
}

//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------
//--------------------------------ANIME-------------------------------------------------------------

router.get('/anime_list', (req, res) => {

    anime.anime_list().then(data => {
        res.json(data);

    })


});
router.post('/anime_list_favorites', (req, res) => {

    anime.anime_list_favorites(req.body.userId).then(data => {
        res.json(data);

    })


});
router.post('/anime_list_search', (req, res) => {

    anime.anime_list_search(req.body.searchWord).then(data => {
        res.json(data);

    })


});
router.post('/anime_list_watchlist', (req, res) => {

    anime.anime_list_watchlist(req.body.userId).then(data => {
        res.json(data);

    })


});
router.post('/anime_details', (req, res) => {

    let pars = req.body;
    let token = pars.Token;
    if (token) {
        let decodedToken = jwt.decode(token);
        anime.anime_details(decodedToken['data']['user']['id'], pars.animeId).then(data => {
            res.json(data);

        })
    }
    else res.json({ "STATUS": 0 });




});

router.post('/insert/anime', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    if (token) {
        if (isAdmin(token)) {
            anime.insertAnime(pars.animeName, pars.authorId, pars.studioId, pars.genre, pars.yearPub, pars.imgLink).then(data => {
                res.json({ "STATUS": data });
            });
        }
        else {
            res.json({ "STATUS": 0 });
        }
    }
    else res.json({ "STATUS": 0 });


});

router.post('/update/anime', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        anime.updateAnime(pars.animeName, pars.authorId, pars.studioId, pars.genre, pars.yearPub, pars.imgLink, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });
});

router.post('/delete/anime', (req, res) => {
    let pars = req.body;
    let token = pars.Token;
    if (token) {
        if (isAdmin(token)) {
            anime.deleteAnime(pars.animeId).then(data => {
                res.json({ "STATUS": data });
            });
        }
        else res.json({ "STATUS": 0 });
    }
    else res.json({ "STATUS": 0 });
});





//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------
//--------------------------------AUTHOR-------------------------------------------------------------


router.get('/select/authorById', (req, res) => {
    let pars = req.query;
    author.selectAuthorById(pars.authorId).then(data => {
        res.json(data);

    })


});

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
    let token = pars.Token;

    if (token && isAdmin(token)) {
        author.insertAuthor(pars.authorName, pars.birthDate, pars.yearsActive, pars.animeGenre, pars.imgLink).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });


});

router.post('/update/author', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        author.updateAuthor(pars.authorName, pars.birthDate, pars.yearsActive, pars.animeGenre, pars.imgLink, pars.authorId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/delete/author', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        author.deleteAuthor(pars.authorId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});


//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------
//--------------------------------SINGER-------------------------------------------------------------



router.get('/select/singerBySong', (req, res) => {
    let pars = req.query;
    singer.selectSingerBySong(pars.songId).then(data => {
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
    let token = pars.Token;

    if (token && isAdmin(token)) {
        singer.insertSinger(pars.singerName, pars.birthDate, pars.imgLink).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });



});

router.post('/update/singer', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        singer.updateSinger(pars.singerName, pars.birthDate, pars.imgLink, pars.singerId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/delete/singer', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        singer.deleteSinger(pars.singerId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

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

router.post('/select/newsBy', (req, res) => {
    let pars = req.body;
    news.selectNewsBy(pars.animeId).then(data => {
        res.json(data);

    })


});


router.post('/delete/news', (req, res) => {
    let pars = req.body; let token = pars.Token;

    if (token && isAdmin(token)) {
        news.deleteNews(pars.newsId).then(data => {
            res.json({ "STATUS": data });

        });

    }
    else res.json({ "STATUS": 0 });

});

router.post('/update/news', (req, res) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        news.updateNews(pars.link, pars.imgLink, pars.animeId, getCurDateForInsertion(), pars.newsId).then(data => {
            res.json({ "STATUS": data });

        });
    }
    else res.json({ "STATUS": 0 });


});

router.post('/insert/news', (req, res) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        news.insertNews(pars.link, pars.imgLink, pars.animeId, getCurDateForInsertion()).then(data => {
            res.json({ "STATUS": data });

        })
    }

    else res.json({ "STATUS": 0 });

});




//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------
//--------------------------------STUDIO-------------------------------------------------------------



router.get('/select/studioById', (req, res) => {
    let pars = req.query;
    studio.selectStudioById(pars.studioId).then(data => {
        res.json(data);

    })


});

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
    let token = pars.Token;

    if (token && isAdmin(token)) {
        studio.insertStudio(pars.studioName, pars.founder, pars.yearFounded).then(data => {
            res.json({ "STATUS": data });
        });

    }
    else res.json({ "STATUS": 0 });

});

router.post('/update/studio', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        studio.updateStudio(pars.studioName, pars.founder, pars.yearFounded, pars.studioId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/delete/studio', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        studio.deleteStudio(pars.studioId).then(data => {
            res.json(data);
        });
    }
    else res.json({ "STATUS": 0 });

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
    let token = pars.Token;

    if (token && isAdmin(token)) {
        va.insertVA(pars.vaName, pars.birthDate, pars.imgLink).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });


});

router.post('/update/va', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        va.updateVA(pars.vaName, pars.birthDate, pars.imgLink, pars.vaId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/delete/va', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        va.deleteVA(pars.vaId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

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

    character.selectCharacterByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/character', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        character.insertCharacter(pars.characterName, pars.characterRole, pars.vaId, pars.animeId, pars.imgLink).then(data => {
            res.json({ "STATUS": data });
        });

    }
    else res.json({ "STATUS": 0 });

});

router.post('/update/character', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        character.updateCharacter(pars.characterName, pars.characterRole, pars.vaId, pars.animeId, pars.imgLink, pars.characterId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/delete/character', (req, res, next) => {
    let pars = req.body; let token = pars.Token;

    if (token && isAdmin(token)) {
        character.deleteCharacter(pars.characterId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

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

    episode.selectEpisodeByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/episode', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        episode.insertEpisode(pars.episodeNumber, pars.episodeLink, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/update/episode', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        episode.updateEpisode(pars.episodeNumber, pars.episodeLink, pars.old_episodeNumber, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

router.post('/delete/episode', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        episode.deleteEpisode(pars.episodeNumber, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

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
    let token = pars.Token;

    if (token && isAdmin(token)) {
        animeaward.insertAnimeAward(pars.awardName, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }

    else res.json({ "STATUS": 0 });


});

router.post('/update/animeaward', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        animeaward.updateAnimeAward(pars.awardName, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }

    else res.json({ "STATUS": 0 });

});

router.post('/delete/animeaward', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token && isAdmin(token)) {
        animeaward.deleteAnimeAward(pars.awardName, pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

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
router.post('/insert/Comment', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(getCurDateForInsertion());
        comment.insertComment(pars.commentData, decodedToken['data']['user']['id'], pars.animeId, getCurDateForInsertion()).then(data => {
            res.json({ "STATUS": 1, "commentId": data });
        });
    }
    else res.json({ "STATUS": 0 });


});

router.post('/update/Comment', (req, res, next) => {
    let pars = req.body;
    comment.updateComment(pars.commentData, pars.userId, pars.animeId, getCurDateForInsertion(), pars.commentId).then(data => {
        res.json({ "STATUS": data });
    });
});

router.post('/delete/Comment', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
        comment.deleteComment(pars.commentId, decodedToken['data']['user']['id'], isAdmin(token)).then(data => {
            res.json({ "STATUS": data });
        });
    }

    else {
        res.json({ "STATUS": 0 });
    }
});


//--------------------------------FAVORITES-------------------------------------------------------------//--------------------------------FAVORITES-------------------------------------------------------------
//--------------------------------FAVORITES-------------------------------------------------------------
//--------------------------------FAVORITES-------------------------------------------------------------
//--------------------------------FAVORITES-------------------------------------------------------------
//--------------------------------FAVORITES-------------------------------------------------------------




router.get('/select/allFavorites', (req, res) => {
    favorites.selectAllFavorites().then(data => {
        res.json(data);

    })


});

router.get('/select/favoritesByUser', (req, res) => {

    favorites.selectFavoritesByUser(req.query.userId).then(data => {
        res.json(data);

    })


});
router.post('/insert/favorites', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token) {
        let decodedToken = jwt.decode(token);
        favorites.insertFavorites(decodedToken['data']['user']['id'], pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }

    else res.json({ "STATUS": 0 });

});


router.post('/delete/favorites', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token) {
        let decodedToken = jwt.decode(token);

        favorites.deleteFavorites(decodedToken['data']['user']['id'], pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }


    else res.json({ "STATUS": 0 });

});




//--------------------------------WATCHLIST-------------------------------------------------------------//--------------------------------WATCHLIST-------------------------------------------------------------
//--------------------------------WATCHLIST-------------------------------------------------------------
//--------------------------------WATCHLIST-------------------------------------------------------------
//--------------------------------WATCHLIST-------------------------------------------------------------
//--------------------------------WATCHLIST-------------------------------------------------------------




router.get('/select/allWatchlists', (req, res) => {
    watchlist.selectAllWatchlists().then(data => {
        res.json(data);

    })


});

router.get('/select/watchlistByUser', (req, res) => {

    watchlist.selectWatchlistByUser(req.query.userId).then(data => {
        res.json(data);

    })


});
router.post('/insert/watchlist', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token) {
        let decodedToken = jwt.decode(token);

        watchlist.insertWatchlist(decodedToken['data']['user']['id'], pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }

    else res.json({ "STATUS": 0 });

});


router.post('/delete/watchlist', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;

    if (token) {
        let decodedToken = jwt.decode(token);

        watchlist.deleteWatchlist(decodedToken['data']['user']['id'], pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});





//--------------------------------SONG-------------------------------------------------------------//--------------------------------SONG-------------------------------------------------------------
//--------------------------------SONG-------------------------------------------------------------
//--------------------------------SONG-------------------------------------------------------------
//--------------------------------SONG-------------------------------------------------------------
//--------------------------------SONG-------------------------------------------------------------




router.get('/select/allSongs', (req, res) => {
    song.selectAllSongs().then(data => {
        res.json(data);

    })


});

router.get('/select/songByAnime', (req, res) => {

    song.selectSongByAnime(req.query.animeId).then(data => {
        res.json(data);

    })


});
router.post('/insert/song', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    if (token && isAdmin(token)) {

        song.insertSong(pars.songName, pars.singerId, pars.animeId, pars.datePublished).then(data => {
            res.json({ "STATUS": data });
        });

    }
    else res.json({ "STATUS": 0 });

});
router.post('/update/song', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    if (token && isAdmin(token)) {

        song.updateSong(pars.songName, pars.singerId, pars.animeId, pars.datePublished, pars.songId).then(data => {
            res.json({ "STATUS": data });
        });

    }
    else res.json({ "STATUS": 0 });

});


router.post('/delete/song', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    if (token && isAdmin(token)) {
        song.deleteSong(pars.songId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else res.json({ "STATUS": 0 });

});

//BAN

router.post('/insert/ban', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
        if (decodedToken['data']['user']['admin']) {
            ban.insertBan(pars.userId, pars.banReason).then(data => {
                res.json({ "STATUS": data });
            });
        }
        else res.json({ "STATUS": 0 });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});

router.post('/delete/ban', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
        if (decodedToken['data']['user']['admin']) {
            ban.deleteBan(pars.userId).then(data => {
                res.json({ "STATUS": data });
            });
        }
        else res.json({ "STATUS": 0 });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});
//Enquiries

router.post('/insert/enquiry', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
        enquiries.insertEnquiry(decodedToken['data']['user']['id'], pars.message, pars.type, getCurDateForInsertion()).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});

router.post('/delete/enquiry', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {

        if (isAdmin(token)) {
            enquiries.deleteEnquiry(pars.enquiryId).then(data => {
                res.json({ "STATUS": data });
            });
        }
        else res.json({ "STATUS": 0 });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});
router.post('/select/allEnquiries', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {
        console.log(decodedToken);
        if (isAdmin(token)) {
            enquiries.selectAllEnquiries().then(data => {
                res.json({ "STATUS": 1, "data": data });
            });
        }
        else res.json({ "STATUS": 0 });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});
//RATINGS

router.post('/insert/rating', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {
        let decodedToken = jwt.decode(token);
        ratings.insertRating(decodedToken['data']['user']['id'], pars.animeId, pars.rating).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});

router.post('/delete/rating', (req, res, next) => {
    let pars = req.body;
    let token = pars.Token;
    console.log(token);
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
        ratings.deleteRating(decodedToken['data']['user']['id'], pars.animeId).then(data => {
            res.json({ "STATUS": data });
        });
    }
    else {
        res.json({ "STATUS": 0 });
    }
});



//--------------------------------USER-------------------------------------------------------------//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------
//--------------------------------USER-------------------------------------------------------------




router.post('/select/allUsers', (req, res) => {
    let token = req.body.Token;
    if (token) {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken['data']['admin']);
        if (decodedToken['data']['admin'] == 1) {

            user.selectAllUsers().then(data => {
                res.json({ "STATUS": 1, "Users": data });

            })
        }
        else res.json({ "STATUS": 0 });
    }
    else { res.json({ "STATUS": 0 }); }

});


router.post('/update/user', (req, res, next) => {
    let pars = req.body;
    user.updateUser(pars.username, pars.password, pars.email, pars.userAttribute, pars.userId).then(data => {
        res.json({ "STATUS": data });
    });
});

router.post('/delete/user', (req, res, next) => {
    let pars = req.body;
    user.deleteUser(pars.userId).then(data => {
        res.json({ "STATUS": data });
    });
});

