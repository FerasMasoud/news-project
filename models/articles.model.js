const db = require('../db/connection');


exports.selectArticle = (article_id) => {
    let query = ` 
    SELECT * FROM articles 
    WHERE article_id = $1
    ;`;

    return db.query(query, [article_id])
    .then((result) => {
        console.log('')
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'no articles found!'});
        }
        else {
            return result.rows[0];
        }
    })
}

exports.updateArticle = (article_id, newVote) => {
    
    let patchVotesQuery = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2 RETURNING *;
    `;

    return db.query(patchVotesQuery, [newVote, article_id])
    .then((result) => {    
        return result.rows[0];
    }
)}