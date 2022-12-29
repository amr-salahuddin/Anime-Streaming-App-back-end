
const { pool } = require('./db');


class SONG {
    async insertSong(songName, singerId, animeId, datePublished) {
        try {
            const res = await pool.query(

                `INSERT INTO Song (song_name,singer_id,anime_id,date_published) values ('${songName}',${singerId},${animeId},'${datePublished}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllSongs() {
        try {
            const res = await pool.query(

                "select * from song;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectSongByAnime(animeId) {
        try {
            const res = await pool.query(

                `select * from song where anime_id = ${animeId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateSong(songName, singerId, animeId, datePublished, songId) {
        try {
            const res = await pool.query(

                `UPDATE Song SET (song_name,singer_id,anime_id,date_published) = ('${songName}',${singerId},${animeId},'${datePublished}') where id = ${songId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }



    async deleteSong(songId) {
        try {
            const res = await pool.query(

                `DELETE FROM Song WHERE id = ${songId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = SONG;