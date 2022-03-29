const db = require('./db/connection')

exports.selectTopics = () => {

    let query = `SELECT * FROM topics;`;
    return db.query(query)
    .then((result) => {
        return result.rows;
    })
}

exports.selectArticle = (article_id) => {

    let query = ` 
    SELECT * FROM articles 
    WHERE article_id = $1
    ;`;

    return db.query(query, [article_id])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'no articles found!'});
        }
        else {
            return result.rows[0];
        }
    })
} 