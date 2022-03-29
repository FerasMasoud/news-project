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
                votes: 0
            });
        });
    });
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




