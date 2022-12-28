
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const { pool } = require('./db');


class ENQUIRIES {
    async insertEnquiry(userId, message, type, datePublished) {
        try {
            const res = await pool.query(

                `INSERT INTO ENQUIRIES (user_id,message,type,date_published) values (${userId},'${message}',${type},'${datePublished}');`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllEnquiries() {
        try {
            const res = await pool.query(

                "select * from ENQUIRIES;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }


    async deleteEnquiry(enquiryId) {
        try {
            const res = await pool.query(

                `DELETE FROM ENQUIRIES WHERE id = ${enquiryId}`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = ENQUIRIES;