const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadsTableTestHelper = {
    async addThread({
        id = `thread-${Date.now()}`,
        title = 'hello',
        body = 'hrei',
    }) {
        const query = {
            text: `
            INSERT INTO
                threads
            (
                id,
                title,
                body,
                owner
            ) VALUES ($1, $2, $3, $4)`,
            values: [id, title, body, owner],
        };

        await pool.query(query);
    },
    async fndThreadById(threadId) {
        const query = {
            text: `
                SELECT
                    t.id AS thread_id,
                    t.title AS thread_title,
                    t.body AS thread_body,
                    t.date AS thread_date,
                    u.username AS thread_username,
                    c.id AS comment_id,
                    c.username AS comment_username,
                    c.date AS comment_date,
                    c.content AS comment_content
                FROM
                    threads t
                LEFT JOIN comments c ON c.thread_id = t.id
                LEFT JOIN users u ON u.id = t.owner
                WHERE t.id = $1`,
            values: [threadId],
        }

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            throw new Error('Thread not found');
        }

        return {
            id: result.rows[0].thread_id,
            title: result.rows[0].thread_title,
            body: result.rows[0].thread_body,
            date: result.rows[0].thread_date,
            username: result.rows[0].thread_username,
            comments: result.rows
                .filter(row => row.comment_id)
                .map(data => ({
                    id: data.comment_id,
                    username: data.thread_username,
                    date: data.comment_date,
                    content: data.comment_content,
                })),
        }
    },
    async cleanTable() {
        await pool.query('TRUNCATE TABLE threads RESTART IDENTITY CASCADE');
    },
};

module.exports = ThreadsTableTestHelper;