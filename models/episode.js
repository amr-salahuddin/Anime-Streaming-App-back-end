
const { pool } = require('./db');
const ANIME = require('./Anime');
const { rows } = require('pg/lib/defaults');

const anime = new ANIME();
class EPISODE {
    async insertEpisode(episodeNumber, episodeLink, animeId) {
        try {
            const res = await pool.query(

                `INSERT INTO episodes (episode_number,episode_link,anime_id) values (${episodeNumber},'${episodeLink}',${animeId});`);
            if (res.rowCount > 0) {
                anime.updateAnimeEpisodes(episodeNumber, animeId).then(data => {
                    console.log('sss', data);

                });
            }
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllEpisodes() {
        try {
            const res = await pool.query(

                "select * from episodes;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectEpisodeByAnime(animeId) {
        try {
            const res = await pool.query(

                `select * from episodes where anime_id = ${animeId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateEpisode(episodeNumber, episodeLink, old_episodeNumber, animeId) {
        try {
            const res = await pool.query(

                `UPDATE  episodes SET (episode_number,episode_link,anime_id) = (${episodeNumber},${episodeLink}) WHERE anime_id=${animeId} AND episode_number =${episodeNumber};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }

    async deleteEpisode(episodeNumber, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM episodes WHERE anime_id = ${animeId} AND episode_number=${episodeNumber} `);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = EPISODE;