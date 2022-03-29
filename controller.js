const { selectTopics } = require('./model'); 

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        next(err);
    });
}