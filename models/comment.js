
const { pool } = require('./db');


class COMMENT {
    async insertComment(commentData, userId, animeId, datePublished) {
        try {
            const res = await pool.query(

                `INSERT INTO Comment (comment_data,user_id,anime_id,date_published) values ('${commentData}',${userId},${animeId},'${datePublished}');`);
            const res2 = await pool.query(`SELECT MAX(id) FROM COMMENT`);
            return res2.rows[0]["max"];
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllComments() {
        try {
            const res = await pool.query(

                "select comment_data,comment.id as comment_id,anime_id,date_published,user_id,username from comment , useranime where user_id = useranime.id")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectCommentsByAnime(animeId) {
        try {
            const res = await pool.query(

                `select * from comment where anime_id = ${animeId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateComment(commentData, userId, animeId, datePublished, commentId) {
        try {
            const res = await pool.query(

                `UPDATE  Comment SET (comment_data,user_id,anime_id,date_published) = ('${commentData}',${userId},${animeId},'${datePublished}') WHERE id = ${commentId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
    async deleteComment(commentId, userId, isAdmin) {
        try {
            if (isAdmin) {
                const res1 = await pool.query(

                    `DELETE FROM Comment WHERE id = ${commentId} AND user_id = ${userId}`);
                return res1.rowCount;
            }
            else {
                const res2 = await pool.query(

                    `DELETE FROM Comment WHERE id = ${commentId} AND user_id = ${userId}`);
                return res2['STATUS']['rowCount'];
            }
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = COMMENT;
