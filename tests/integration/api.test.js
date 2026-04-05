const request = require('supertest');
const app = require('../../src/server');

describe('Integration Test: Books API', () => {
  test('GET /api/books ควรได้ Status 200', async () => {
    const res = await request(API_URL).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});