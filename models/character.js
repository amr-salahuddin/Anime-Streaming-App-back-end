
const { pool } = require('./db');


class CHARACTER {
    async insertCharacter(characterName, characterRole, vaId, animeId, imgLink) {
        try {
            const res = await pool.query(

                `INSERT INTO Character (character_name,character_role,va_id,anime_id,char_img_link) values ('${characterName}',${characterRole},${vaId},${animeId},'${imgLink}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllCharacters() {
        try {
            const res = await pool.query(

                "select * from character;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectCharacterByAnime(animeId) {
        try {
            const res = await pool.query(

                `select * from character where anime_id = ${animeId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateCharacter(characterName, characterRole, vaId, animeId, imgLink, characterId) {
        try {
            const res = await pool.query(

                `UPDATE Character SET (character_name,character_role,va_id,anime_id,char_img_link) = ('${characterName}',${characterRole},${vaId},${animeId},'${imgLink}') where char_id = ${characterId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }



    async deleteCharacter(characterId) {
        try {
            const res = await pool.query(

                `DELETE FROM Character WHERE char_id = '${characterId}'`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = CHARACTER;