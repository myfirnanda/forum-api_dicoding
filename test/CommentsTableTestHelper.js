const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
    async addComment({ id = 'comment-u34ih4i34oi34', content = 'sebuah comment', owner = 'user-IH89u9wuf98fFI'}) {
        const query = {
            text: `
            INSERT INTO
                comments
            (
                id,
                content,
                owner
            ) VALUES ($1, $2, $3)`,
            values: [id, content, owner],
        };
        await pool.query(query);
    },
    async deleteComment({ commentId }) {
        const query = {
            text: 'DELETE FROM comments WHERE id = $1',
            values: [commentId],
        };
        await pool.query(query);
    },
    async cleanTable() {
        await pool.query('TRUNCATE TABLE comments');
    },
};

module.exports = CommentsTableTestHelper;