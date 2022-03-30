const db = require('../db/connection');

exports.selectUsers = () => {
    let query = `
        SELECT username FROM users;
    `;

    return db.query(query)
    .then((result) => {
        return result.rows;
    });
}