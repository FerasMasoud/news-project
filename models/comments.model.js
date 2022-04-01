const db = require('../db/connection');
const { selectArticles } = require('../models/articles.model');

exports.selectCommentsFromArticle = (article_id) => {
    
    // push all exisiting article ids to an array
    const existingArticles = [];
    selectArticles().then((result) => {
        for(let i = 0; i < result.length; i++) {
            existingArticles.push(result[i].article_id);
        }
    });

    let query = `
        SELECT * FROM comments
        WHERE article_id = $1; 
    `;
 
    return db.query(query, [article_id])
        .then((result) => {  
        //if article_id doesn't exisit in the db reject the request
        if(!existingArticles.includes(parseInt(article_id))) {
            return Promise.reject({status: 404, msg: 'no comments found!'});
        } 
        else {
            return result.rows;
        }   
    });     
}

exports.theComment = (article_id, username, comment) => { 
    let query = ` 
        INSERT INTO comments
        (article_id, author, body)
        VALUES ($1, $2, $3) RETURNING author AS username, body;
    `;

    return db.query(query, [article_id, username, comment])
    .then((result) => {
        //when body only contains white spaces 
        if(comment.length >= 0 && !comment.match(/\w/gi))
        {
            return Promise.reject({ status: 400, msg: "can not post a comment with only white spaces"});
        }

        return result.rows[0];
    })

}


