
const { pool } = require('./db');


class ANIME {
    async insertAnime(animeName, authorId, studioId, genre, yearPub, imgLink) {

        //const checkNo = await pool.query(`SELECT COUNT(anime_name) where anime_name =${animeName}`);
        // console.log(checkNo);
        try {


            const res = await pool.query(

                `INSERT INTO Anime (anime_name,author_id,studio_id,genre,year_published,img_link) values('${animeName}',${authorId},${studioId},'${genre}',${yearPub},'${imgLink}');`);
            return res.rowCount;
        }
        catch (error) {
            return error;
        }


    }




    async anime_list() {
        try {
            const res = await pool.query(

                "select id,anime_name,img_link,rate,episodes from anime")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }
    async anime_list_search(searchWord) {
        try {
            const res = await pool.query(

                `select id,anime_name,img_link,rate,episodes from anime WHERE anime_name ILIKE '%${searchWord}%'`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async anime_list_favorites(userId) {
        try {
            let tst = `SELECT anime_id from favorites where user_id =${userId}`
            const res = await pool.query(

                `select id,anime_name,img_link,rate,episodes from anime  where id in (${tst})`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }
    async anime_list_watchlist(userId) {
        try {
            let tst = `SELECT anime_id from watchlist where user_id =${userId}`
            const res = await pool.query(

                `select id,anime_name,img_link,rate,episodes from anime  where id in (${tst})`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async anime_details(userId, animeId) {
        try {
            const anime = await pool.query
                (`Select anime_name,rate,episodes,genre,img_link,year_published from anime where id=${animeId}`);
            const author = await pool.query(

                `select author_name ,author.id from author , anime where anime.id=${animeId} AND author.id = author_id
                `);
            const studio = await pool.query(

                `select studio_name ,studio.id from STUDIO , ANIME where anime.id=${animeId} AND studio.id = studio_id
                   `);
            const song = await pool.query(

                `select id,song_name ,singer_id,date_published from SONG where anime_id=${animeId}
                        `);
            const character = await pool.query(

                `SELECT * from character,va where anime_id=${animeId} AND character.va_id =va.va_id `);

            const awards = await pool.query(

                `SELECT   award_name   from anime_awards where anime_id=${animeId} `);

            const episodes = await pool.query(

                `SELECT   episode_number,episode_link   from episodes where anime_id=${animeId} `);

            const userRating = await pool.query(`SELECT rating FROM RATINGS where user_id =${userId} AND anime_id =${animeId}`);
            let isRate = 0;
            if (userRating.rowCount > 0)
                isRate = userRating.rows[0]['rating'];
            let x = {
                'anime': anime.rows[0], 'rating': isRate, 'author': author.rows[0], 'studio': studio.rows[0], "songs": song.rows, "characters": character.rows, "awards": awards.rows, "episodes": episodes.rows
            };
            return x;
        }
        catch (error) {
            console.error(error);
        }


    }

    async updateAnime(animeName, authorId, studioId, genre, yearPub, imgLink, animeId) {
        try {

            const res = await pool.query(

                `UPDATE Anime  SET (anime_name,author_id,studio_id,genre,year_published,img_link) = ('${animeName}',${authorId},${studioId},'${genre}',${yearPub},'${imgLink}') WHERE id=${animeId};`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }

    async updateAnimeEpisodes(episodeNumber, animeId) {
        try {

            const res = await pool.query(

                `UPDATE Anime  SET episodes = ${episodeNumber} WHERE id=${animeId};`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
    async updateAnimeRating(animeId, rating) {
        try {

            const res = await pool.query(

                `UPDATE Anime  SET rate = ${rating} WHERE id=${animeId};`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
    async deleteAnime(animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM Anime WHERE id = ${animeId}`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = ANIME;