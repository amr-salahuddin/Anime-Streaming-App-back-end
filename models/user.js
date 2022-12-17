
const { pool } = require('./db');


class USER {
    async insertUser(username, password, email, userAttribute, dateCreated) {
        try {
            const res = await pool.query(

                `INSERT INTO useranime (username,password,email,user_attribute,date_created) values ('${username}','${password}','${email}',${userAttribute},'${dateCreated}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllUsers() {
        try {
            const res = await pool.query(

                "select * from useranime;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }
    async updateUser(username, password, email, userAttribute, userId) {
        try {
            const res = await pool.query(

                `UPDATE useranime SET (username,password,email,user_attribute) = ('${username}','${password}','${email}',${userAttribute}) where id =${userId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
    async deleteUser(userId) {
        try {
            const res = await pool.query(

                `DELETE FROM useranime WHERE id = '${userId}'`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = USER;