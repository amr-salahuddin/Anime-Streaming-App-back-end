
const { pool } = require('./db');


class USER {
    async insertUser(username, password, email, userAttribute, dateCreated) {
        try {
            const res = await pool.query(

                `INSERT INTO User (username,password,email,user_attribute,date_created) values ('${username}','${password}','${email}',${userAttribute},'${dateCreated}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllUsers() {
        try {
            const res = await pool.query(

                "select * from user;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }
    async insertUser(username, password, email, userAttribute, dateCreated, userId) {
        try {
            const res = await pool.query(

                `UPDATE User SET (username,password,email,user_attribute,date_created) = ('${username}','${password}','${email}',${userAttribute},'${dateCreated}') where id =${userId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
    async deleteUser(userId) {
        try {
            const res = await pool.query(

                `DELETE FROM User WHERE id = '${userId}'`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = USER;