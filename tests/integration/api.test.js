const request = require('supertest');
const app = require('../../src/server');

describe('Integration Test: Library API Endpoints', () => {
  
  // --- หมวดที่ 1: การจัดการหนังสือ (Books) ---
  describe('GET /api/books', () => {
    test('1. ควรดึงข้อมูลหนังสือทั้งหมดได้ (Status 200)', async () => {
      const res = await request(app).get('/api/books');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});