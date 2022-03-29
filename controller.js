const { selectTopics, selectArticle } = require('./model'); 

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        next(err);
    });
}

exports.getArticle = (req, res, next) => {
    const { article_id }  = req.params;

    selectArticle(article_id)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        next(err);
    });
}