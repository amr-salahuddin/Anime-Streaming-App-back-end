
const { pool } = require('./db');


class AUTHOR {
    async insertAuthor(authorName, birthDate, yearsActive, animeGenre, imgLink) {
        try {
            const res = await pool.query(

                `INSERT INTO Author (author_name,birth_date,years_active,anime_genre,img_link) values ('${authorName}','${birthDate}',${yearsActive},'${animeGenre}','${imgLink}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllAuthors() {
        try {
            const res = await pool.query(

                "select * from author;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }


    async selectAuthorById(authorId) {
        try {
            const res = await pool.query(

                `select * from author where id = ${authorId}`)
            return res.rows[0];
        }
        catch (error) {
            console.error(error);
        }


    }



    async selectAuthorByAnime(animeId) {
        try {
            let authorId = `(SELECT author_id from anime where anime.id =${animeId})`;
            const res = await pool.query(

                `select * from author where id = ${authorId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateAuthor(authorName, birthDate, yearsActive, animeGenre, imgLink, authorId) {
        try {
            const res = await pool.query(

                `UPDATE Author SET (author_name,birth_date,years_active,anime_genre,img_link) = ('${authorName}','${birthDate}',${yearsActive},'${animeGenre}','${imgLink}') where id = ${authorId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }



    async deleteAuthor(authorId) {
        try {
            const res = await pool.query(

                `DELETE FROM Author WHERE id = ${authorId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = AUTHOR;