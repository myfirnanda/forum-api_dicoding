const pool = require("../src/Infrastructures/database/postgres/pool");

const AuthenticationsTableTestHelper = {
    // Login
    async addToken(token) {
        const query = {
            text: 'INSERT INTO authentications VALUES ($1)',
            values: [token],
        }
        await pool.query(query);
    },
    async findToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };
        const result = await pool.query(query);
        return result.rows;
    },
    // Logout
    async deleteToken(token) {
        const query = {
            text: `DELETE FROM authentications WHERE token = $1`,
            values: [token],
        };
        await pool.query(query);
    },
    async cleanTable() {
        await pool.query('TRUNCATE TABLE authentications');
    }
};

module.exports = AuthenticationsTableTestHelper;