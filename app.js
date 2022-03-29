const express = require('express');
const { getTopics, getArticle } = require('./controller');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);



app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
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

