
const { pool } = require('./db');


class COMMENT {
    async insertComment(commentData, userId, animeId, datePublished) {
        try {
            const res = await pool.query(

                `INSERT INTO Comment (comment_data,user_id,anime_id,date_published) values ('${commentData}',${userId},${animeId},'${datePublished}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllComments() {
        try {
            const res = await pool.query(

                "select * from comment;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectCommentByUser(userId) {
        try {
            const res = await pool.query(

                `select * from comment where user_id = ${userId}`)
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
    async deleteComment(commentId) {
        try {
            const res = await pool.query(

                `DELETE FROM Comment WHERE id = '${commentId}'`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = COMMENT;