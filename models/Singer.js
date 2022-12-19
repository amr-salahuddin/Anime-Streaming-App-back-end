
const { pool } = require('./db');


class SINGER {
    async insertSinger(singerName, birthDate, imgLink) {
        try {
            const res = await pool.query(

                `INSERT INTO Singer (singer_name,birth_date,img_link) values ('${singerName}','${birthDate}','${imgLink}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllSingers() {
        try {
            const res = await pool.query(

                "select * from singer;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectSingerBySong(songId) {
        try {
            let singerId = `(SELECT singer_id from song where song.id =${songId})`;
            const res = await pool.query(

                `select * from singer where id = ${singerId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateSinger(singerName, birthDate, imgLink, singerId) {
        try {
            const res = await pool.query(

                `UPDATE Singer SET (singer_name,birth_date,img_link) = ('${singerName}','${birthDate}','${imgLink}') where id = ${singerId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }



    async deleteSinger(singerId) {
        try {
            const res = await pool.query(

                `DELETE FROM Singer WHERE id = ${singerId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = SINGER;