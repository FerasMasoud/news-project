const { resetWatchers } = require('nodemon/lib/monitor/watch');
const { selectArticleById, updateArticle, selectArticles} = require('../models/articles.model');

exports.getArticleById = (req, res, next) => {
    const { article_id}  = req.params;
   
    selectArticleById(article_id)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        next(err);
    });
}

exports.patchArticle = (req, res, next) => {
    const { article_id } = req.params; 
    const { inc_votes } = req.body; 

    updateArticle(article_id, inc_votes)
    .then((result) => {
        res.status(201).send(result)
    })
    .catch(next);
    
}

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((data) => {
        res.send(data);
    })
}

