
const { pool } = require('./db');


class VA {
    async insertVA(vaName, birthDate, imgLink) {
        try {
            const res = await pool.query(

                `INSERT INTO VA (va_name,birth_date,va_img_link) values ('${vaName}','${birthDate}','${imgLink}');`);
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

    async selectVA(vaId) {
        try {
            const res = await pool.query(

                `select * from va where va_id = ${vaId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateVA(vaName, birthDate, imgLink, vaId) {
        try {
            const res = await pool.query(

                `UPDATE VA SET (va_name,birth_date,va_img_link) = ('${vaName}','${birthDate}','${imgLink}') where va_id = '${vaId}';`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }



    async deleteVA(vaId) {
        try {
            const res = await pool.query(

                `DELETE FROM VA WHERE va_id = ${vaId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = VA;