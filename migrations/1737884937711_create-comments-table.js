/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        content: {
            type: 'VARCHAR(200)',
            notNull: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        date: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
        is_delete: {
            type: 'BOOLEAN',
            notNull: true,
            default: false,
        },
    });

    pgm.addConstraint('comments', 'fk_comments.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('comments', 'fk_comments.thread_id_threads.id');
    pgm.dropConstraint('comments', 'fk_comments.user_id_users.id');
    pgm.dropTable('comments');
};
