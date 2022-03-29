const { resetWatchers } = require('nodemon/lib/monitor/watch');
const { selectArticle, updateArticle } = require('../models/articles.model');

exports.getArticle = (req, res, next) => {
    const { article_id}  = req.params;
   
    selectArticle(article_id)
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
}