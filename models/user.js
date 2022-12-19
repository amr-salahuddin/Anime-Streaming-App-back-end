
const { pool } = require('./db');
const bcrypt = require('bcrypt');
const { rows } = require('pg/lib/defaults');

class USER {
    async insertUser(username, password, email, userAttribute, dateCreated) {

        try {
            let hashedPassword = await bcrypt.hash(password, 10);

            const res = await pool.query(

                `INSERT INTO useranime (username,password,email,user_attribute,date_created) values ('${username}','${hashedPassword}','${email}',${userAttribute},'${dateCreated}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }

    async authenticateUser(username, password) {
        try {
            const res = await pool.query(

                `SELECT username, password FROM useranime where username ='${username}'`);
            if (res.rows[0]['username'] != null) {

                const isCorrect = await bcrypt.compare(password, res.rows[0]['password']);
                if (isCorrect)
                    return res.rows[0];
                else return 0;
            }
            else return 0;
        }
        catch (error) {
            return 0;
        }


    }

    async selectUserById(userId) {

        try {
            const res = await pool.query(
                `SELECT * from useranime where id= ${userId};`
            );
            return res.rows;

        } catch (error) {
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

                `DELETE FROM useranime WHERE id = ${userId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = USER;