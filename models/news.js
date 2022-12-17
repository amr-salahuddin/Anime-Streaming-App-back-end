
const { restart } = require('nodemon');
const { pool } = require('./db');


class NEWS {
    async selectAllNews() {
        try {
            const res = await pool.query(

                `SELECT * FROM news ORDER BY publish_date DESC`);
            return res.rows;
        }
        catch (error) {
            return 0;
        }


    }
    async insertNews(link, imgLink, animeId, studioId, characterId, singerId, authorId, vaId, publishDate) {
        try {
            const res = await pool.query(

                `INSERT INTO NEWS (link,img_link,anime_id,studio_id,character_id,singer_id,author_id,va_id,publish_date) values('${link}','${imgLink}',${animeId},${studioId},${characterId},${singerId},${authorId},${vaId},'${publishDate}')`);
            return res.rows;
        }
        catch (error) {
            return 0;
        }


    }
    async updateNews(link, imgLink, animeId, studioId, characterId, singerId, authorId, vaId, publishDate, newsId) {
        try {
            const res = await pool.query(

                `UPDATE NEWS SET (link,img_link,anime_id,studio_id,character_id,singer_id,author_id,va_id,publish_date) = ('${link}','${imgLink}',${animeId},${studioId},${characterId},${singerId},${authorId},${vaId},'${publishDate}') WHERE id = ${newsId}`);
            return res.rows;
        }
        catch (error) {
            return 0;
        }


    }

    async deleteNews(newsId) {
        try {
            const res = await pool.query(
                `DELETE FROM NEWS WHERE id = ${newsId}`
            );
            return res.rows;
        }
        catch (error) {
            return 0;
        }

    }
    async selectNewsBy(animeId, studioId, characterId, singerId, authorId, vaId) {
        try {
            const res = await pool.query(

                `SELECT * FROM news WHERE anime_id= ${animeId} AND author_id=${authorId} AND singer_id =${singerId} AND studio_id = ${studioId} AND character_id =${characterId} AND va_id = ${vaId} ORDER BY publish_date DESC`);
            return res.rows;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = NEWS;