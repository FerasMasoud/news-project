const express = require('express');
const { getTopics } = require('./controllers/topics.controller');
const { getArticleById, patchArticle, getArticles } = require('./controllers/articles.controller');
const { getUsers } = require('./controllers/users.controller');
const { getCommentsFromArticle, postComment, deleteComment } = require('./controllers/comments.controller');



const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticle);
app.get('/api/articles', getArticles);
app.get('/api/users', getUsers);
app.get('/api/articles/:article_id/comments', getCommentsFromArticle );
app.post('/api/articles/:article_id/comments', postComment);
app.delete('/api/comments/:comment_id', deleteComment);

//psql errors
app.use((err, req, res, next) => {
    const errors = ['22P02']
    if (err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
    else if (errors.includes(err.code)) {
        res.status(400).send({ msg: 'bad request!'});
    }
    else {
        next(err);
    }
})

app.all("/*", (req, res) => {
    res.status(404).send({ msg: "path not found!!" });
});

app.use((err, req, res, next) => {
    console.log(err, ' << 500 err');
    res.status(500).send({ msg: 'internal server error'});
}) 




module.exports = app;

