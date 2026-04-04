// tests/integration/api.test.js
const request = require('supertest');
// สมมติว่า URL API ของโปรเจคอาจารย์คือ http://localhost:3000
const API_URL = 'http://localhost:3000'; 

describe('Integration Test: Books API', () => {
  test('GET /api/books ควรได้ Status 200', async () => {
    const res = await request(API_URL).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});