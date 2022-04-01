//import from comments model

const { selectCommentsFromArticle, theComment, deleteCommentById } = require("../models/comments.model")

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

exports.deleteComment = (req, res, next) => {
    // params
    // body
    const { comment_id } = req.params;
    deleteCommentById(comment_id)
    .then(() => {
        res.status(204).send({});
    })
    .catch(next);
}
