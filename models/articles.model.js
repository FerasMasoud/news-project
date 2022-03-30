const db = require('../db/connection');


exports.selectArticleById = (article_id) => {
    
    let newQuery = `
    SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, 
    articles.created_at, articles.votes, COUNT(comments.article_id) AS comment_count
    
    FROM articles
  
    JOIN comments 
    ON articles.article_id = comments.article_id

    WHERE articles.article_id = $1

    GROUP BY articles.article_id, articles.title, articles.topic, articles.author, articles.body,
    articles.created_at, articles.votes;`;

    return db.query(newQuery, [article_id])
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
    
    //the query from the db
    let patchVotesQuery = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2 RETURNING *;
    `;

    //the return of the query
    return db.query(patchVotesQuery, [newVote, article_id])
    .then((result) => {   
        if(result.rows.length === 0) {
            return Promise.reject({status: 400, msg: "bad request!"});
        } 
        return result.rows[0];
    }

)}

exports.selectArticles = () => {
    let query = `
        SELECT articles.author, articles.title, articles.article_id, articles.topic, 
        articles.created_at, articles.votes, COUNT(comments.article_id) AS comment_count

        FROM articles

        JOIN comments 
        ON articles.article_id = comments.article_id

        GROUP BY articles.author, articles.title, articles.article_id, articles.topic,
        articles.created_at, articles.votes

        ORDER BY articles.created_at Desc;
    `;

    return db.query(query)
    .then((result) => {
        return result.rows;
    })
}