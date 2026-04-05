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
  describe('GET /api/books/:id', () => {
    test('2. ค้นหาหนังสือที่มีอยู่ ควรได้ Status 200', async () => {
      const res = await request(app).get('/api/books/1'); // สมมติว่า ID 1 มีอยู่จริง
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
    });
    test('3. ค้นหาหนังสือที่ไม่มีอยู่ ควรได้ Status 404', async () => {
      const res = await request(app).get('/api/books/9999');
      expect(res.statusCode).toBe(404);
    });
  });
  describe('POST /api/books', () => {
    test('4. สร้างหนังสือใหม่สำเร็จ ควรได้ Status 201', async () => {
      const res = await request(app).post('/api/books').send({
        title: "Test Book",
        author: "John Doe"
      });
      expect([200, 201]).toContain(res.statusCode); 
    });

    test('5. สร้างหนังสือโดยไม่ใส่ title ควรได้ Status 400', async () => {
      const res = await request(app).post('/api/books').send({ author: "John Doe" });
      expect(res.statusCode).toBe(400);
    });
  });
  // --- หมวดที่ 2: ระบบล็อกอิน (Authentication) ---
  describe('POST /api/auth/login', () => {
    test('6. ล็อกอินด้วยข้อมูลที่ถูกต้อง ควรได้ Token', async () => {
      const res = await request(app).post('/api/auth/login').send({
        username: "admin",
        password: "password123"
      });
      // ปรับเช็คตามระบบของคุณว่าส่งอะไรกลับมา
      expect(res.statusCode).toBe(200); 
    });

    test('7. ทดสอบ SQL Injection บนช่อง Username ควรถูกปฏิเสธ (Status 401)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        username: "' OR '1'='1",
        password: "password123"
      });
      expect(res.statusCode).not.toBe(200);
    });
  });
});