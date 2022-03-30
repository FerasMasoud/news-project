const db = require('../db/connection');
const { selectArticles } = require('../models/articles.model');

exports.selectCommentsFromArticle = (article_id) => {
    
    const articlesCount = [];

    //selectArticles to get the length of the articles
    selectArticles().then((data) => {
        articlesCount.push(data.length);
    });

    let query = `
        SELECT * FROM comments
        WHERE article_id = $1;   
    `;

    return db.query(query, [article_id])
    .then((result) => {  
        //if id is not in db reject the request    
        if(article_id > articlesCount[0]) {
            return Promise.reject({status: 404, msg: "no articles found!"});
        }
        return result.rows;
    });
    
}