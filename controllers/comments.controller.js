//import from comments model

const { selectArticles } = require("../models/articles.model");
const { selectCommentsFromArticle } = require("../models/comments.model")

exports.getCommentsFromArticle = (req, res, next) => {
    
    const { article_id } = req.params;
    selectCommentsFromArticle(article_id)
    .then((data) => {
        res.send(data);
    })
    .catch(next);
}
