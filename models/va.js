
const { pool } = require('./db');


class VA {
    async insertVA(vaName, birthDate, imgLink) {
        try {
            const res = await pool.query(

                `INSERT INTO VA (va_name,birth_date,img_link) values ('${vaName}','${birthDate}','${imgLink}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllVAs() {
        try {
            const res = await pool.query(

                "select * from va;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectVAByAnime(animeId) {
        try {
            let vaId = `(SELECT va_id from anime where anime.id =${animeId})`;
            const res = await pool.query(

                `select * from va where id = ${vaId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateVA(vaName, birthDate, imgLink, vaId) {
        try {
            const res = await pool.query(

                `UPDATE VA SET (va_name,birth_date,img_link) = ('${vaName}','${birthDate}','${imgLink}') where id = '${vaId}';`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }



    async deleteVA(vaId) {
        try {
            const res = await pool.query(

                `DELETE FROM VA WHERE id = '${vaId}'`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = VA;