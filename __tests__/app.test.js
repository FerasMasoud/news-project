const { idleTimeoutMillis } = require('pg/lib/defaults');
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe('GET /api/articles/:article_id', () => { 
    test('return an article object by id', () => {
        return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then((result) => {
            expect(result.body).toBeInstanceOf(Object);
            expect(result.body.article_id).toBe(5);
            expect(result.body).toMatchObject({
                author: 'rogersop',
                title: 'UNCOVERED: catspiracy to bring down democracy',
                article_id: 5,
                body: 'Bastet walks amongst us, and the cats are taking arms!',
                topic: 'cats',
                created_at: '2020-08-03T13:14:00.000Z',
                votes: 0,
            });
        });
    });
    test('return an article object by id and + comment_count ', () => {
        return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then((result) => {
            expect(result.body.comment_count).toBe('2');
            expect(result.body).toMatchObject({
                author: 'rogersop',
                title: 'UNCOVERED: catspiracy to bring down democracy',
                article_id: 5,
                body: 'Bastet walks amongst us, and the cats are taking arms!',
                topic: 'cats',
                created_at: '2020-08-03T13:14:00.000Z',
                votes: 0,
                comment_count: '2'

            });
        })
    })
    test('return 404 when article id is not found', () => {
        return request(app)
        .get('/api/articles/100')
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe('no articles found!');
        })
    })
})

describe('GET /api/topics', () => { 
    test('return an array of topic objects with each should have the slug and description properties', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {
            expect(result.body).toBeInstanceOf(Array);
            result.body.forEach(element => {
                expect(element).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                });
            });
        })
    })
    test('return 404 when the path is not correct', () => {
        return request(app)
        .get('/api/randomPath')
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe("path not found!!" );
        })
    })
})

describe('PATCH  /api/articles/:article_id', () => { 
    test('patch the votes property in the database and increment by a number', () => {
        return request(app)
        .patch('/api/articles/5')
        .send({ inc_votes: 2 })
        .expect(201)
        .then((result) => {
            expect(result.body.article_id).toBe(5);
            expect(result.body).toMatchObject({
                author: 'rogersop',
                title: 'UNCOVERED: catspiracy to bring down democracy',
                article_id: 5,
                body: 'Bastet walks amongst us, and the cats are taking arms!',
                topic: 'cats',
                created_at: '2020-08-03T13:14:00.000Z',
                votes: 2
            });
        });
    })
    //add test where the id doesn't exist 
    test('return 400 bad request when article id is not found', () => {
        return request(app)
        .patch('/api/articles/1000')
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe("bad request!");
        })
    })
})

describe('GET /api/articles', () => { 
    test('return an articles array of article objects with custom columns', () => {
        return request(app)
        .get('/api/articles?sort_by=created_at')
        .expect(200)
        .then((result) => {
            expect(result.body).toBeInstanceOf(Array);
            result.body.forEach((element) => {
                expect(element).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String),
                });
            }); 
        });
    }) 
    test('articles should be sorted_by date and in descending order', () => {
        return request(app)
        .get(`/api/articles?sort_by=created_at`)
        .expect(200)
        .then((results) => {
            expect(results.body).toBeSortedBy('created_at', {                       
                descending: true
            });
        })
    })
    test('sort by valid topic query', () => {
        return request(app)
        .get(`/api/articles?topic=mitch`)
        .expect(200)
        .then((results) => {
            expect(results.body).toBeSortedBy('topic', {
                descending: true
            });
        })
    })
    
    test('return 404 when endpoint is not correct' , () => {
        return request(app)
        .get('/api/arltsd')
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe('path not found!!')
        })
    })
    test('return 400 when queries are not valid', () => {
        return request(app)
        .get('/api/articles?order=daskdjl')
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe("Invalid order query");
        })
    })
    test('return 400 when queries are not valid', () => {
        return request(app)
        .get('/api/articles?sort_by=daskdjl')
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe("Invalid sort query");
        })
    })
    test('return 404 when sort topic is not valid', () => {
        return request(app)
        .get(`/api/articles?topic=dasd`)
        .expect(404)
        .then((results) => {
            expect(results.body.msg).toBe("Invalid topic");
        })
    })
    
})

describe('GET /api/users', () => { 
    test('return an array of users each having username property', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((result) => {
            expect(result.body).toBeInstanceOf(Array);
            result.body.forEach((element) => {
                expect(element).toEqual({
                    username: expect.any(String)
                });
            });
        });
    })
    test('return 404 when endpoint is not correct' , () => {
        return request(app)
        .get('/api/usetasds')
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe('path not found!!')
        })
    })
    
})

describe('GET /api/articles/:article_id/comments', () => {
    test('return an array of comments of given article_id', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((result) => {
            expect(result.body).toBeInstanceOf(Array);
            result.body.forEach((element) => {
                expect(element).toEqual({
                    article_id: 1,
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String)
                });
            });
        });
    })
    test("return 404 when article doesn't exist", () => {
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe('no comments found!');
        })
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    test('post a comment into specific article', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({ username: 'butter_bridge', body: 'test comment' })
        .expect(201)
        .then((result) => {
            expect(result.body).toMatchObject({
                username: 'butter_bridge', body: 'test comment'
            });
        })
    })
    test('return 400 when the comment only has white spaces', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({ username: 'rogersop', body: ' '})
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe("can not post a comment with only white spaces");
        })
    })

})

describe('DELETE /api/comments/:comment_id', () => { 
    test('delete comment by ID', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204);
    })
    test('return 400 when comment does not exist', () => {
        return request(app)
        .delete('/api/comments/fsd')
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe('bad request!');
        })
    })
})






