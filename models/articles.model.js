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

exports.selectArticles = (sort_by='created_at', order='desc', topic) => {
    const valid_sortBy = ['author', 'created_at', 'title', 'article_id', 'body', 'topic', 'votes'];
    const existing_culomns = [];
    const valid_sortOrder = ['asc', 'desc'];
    const valid_filterTopics = [ 'cats', 'mitch', 'paper'];
    const topicValue = [];

    let query = `
        SELECT articles.author, articles.title, articles.article_id, articles.topic, 
        articles.created_at, articles.votes, COUNT(comments.article_id) AS comment_count
        FROM articles

        LEFT JOIN comments 
        ON articles.article_id = comments.article_id  
    `;

    if(topic) {
        // get only articles of specefic topic
        if(!valid_filterTopics.includes(topic)) {
            return Promise.reject({ status: 404, msg: "Invalid topic" });
        }
        topicValue.push(topic);
        query += ` WHERE articles.topic = $1`
        
    }
    
    query += ` 
        GROUP BY articles.author, articles.title, articles.article_id, articles.topic,
        articles.created_at, articles.votes
        ORDER BY articles.${sort_by} ${order};
    `;


    if(!valid_sortBy.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "Invalid sort query" });
    }
    else if(!valid_sortOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Invalid order query" });
    }
    else {
        return db.query(query, topicValue)
        .then((result) => {
            return result.rows;
        })    
    }
    
}
