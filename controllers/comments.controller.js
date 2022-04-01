//import from comments model

const { selectArticles } = require("../models/articles.model");
const { selectCommentsFromArticle, theComment } = require("../models/comments.model")

exports.getCommentsFromArticle = (req, res, next) => {
    
    const { article_id } = req.params;
    selectCommentsFromArticle(article_id)
    .then((data) => {
        res.send(data);
    })
    .catch(next);
}

exports.postComment = (req, res, next) => {
    
    const { article_id } = req.params;
    const { username, body } = req.body;

    theComment(article_id, username ,body)
    .then((data) => {
        // we might need to parse data
        res.status(201).send(data);
    })
    .catch(next);
}
