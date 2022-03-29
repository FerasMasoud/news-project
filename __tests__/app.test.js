const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const testData = require('../db/data/test-data/');
const seed = require('../db/seeds/seed');

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe('GET /api/topics', () => { 
    test('return an array of topic objects with each should have the slug and description properties', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {
            expect(result.body).toBeInstanceOf(Array);
            result.body.forEach(element => {
                expect(element).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
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


