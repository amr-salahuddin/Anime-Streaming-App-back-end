
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
    async insertNews(link, imgLink, animeId, publishDate) {
        try {
            const res = await pool.query(

                `INSERT INTO NEWS (link,img_link,anime_id,publish_date) values('${link}','${imgLink}',${animeId},'${publishDate}')`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
    async updateNews(link, imgLink, animeId, publishDate, newsId) {
        try {
            const res = await pool.query(

                `UPDATE NEWS SET (link,img_link,anime_id = ('${link}','${imgLink}',${animeId},'${publishDate}') WHERE id = ${newsId}`);
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
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }

    }
    async selectNewsBy(animeId) {
        try {
            const res = await pool.query(

                `SELECT * FROM news WHERE anime_id= ${animeId} ORDER BY publish_date DESC`);
            return res.rows;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = NEWS;