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
  // --- หมวดที่ 3: การยืมหนังสือ (Borrow) ---
  describe('POST /api/borrow', () => {
    test('8. ยืมหนังสือสำเร็จ ควรได้ Status 200', async () => {
      const res = await request(app).post('/api/borrow').send({ bookId: 1 })
      .set('Authorization', 'Bearer valid-token-here'); // สมมติว่าต้องใช้ Token
      
      expect(res.statusCode).toBe(200);
    });
  });
 // --- หมวดที่ 4: การอัปเดตข้อมูลหนังสือ (PUT) ---
  describe('PUT /api/books/:id', () => {
    test('9. อัปเดตข้อมูลหนังสือสำเร็จ ควรได้ Status 200', async () => {
      const res = await request(app).put('/api/books/1').send({
        title: "Updated Title",
        author: "Updated Author"
      });
      expect(res.statusCode).toBe(200);
    });
    test('10. อัปเดตหนังสือที่ไม่มีอยู่จริง ควรได้ Status 404', async () => {
      const res = await request(app).put('/api/books/999').send({ title: "No" });
      expect(res.statusCode).toBe(404);
    });
    test('11. อัปเดตด้วยข้อมูลที่ผิดประเภท (เช่นส่งเลขแทนชื่อ) ระบบควรจัดการได้', async () => {
      const res = await request(app).put('/api/books/1').send({ title: 12345 });
      expect(res.statusCode).toBe(400); // หรือ 200 ตามที่โค้ดคุณรับมือ
    });
  }); 
  // --- หมวดที่ 5: การลบหนังสือ (DELETE) ---
  describe('DELETE /api/books/:id', () => {
    test('12. ลบหนังสือสำเร็จ ควรได้ Status 200 หรือ 204', async () => {
      const res = await request(app).delete('/api/books/1');
      expect([200, 204]).toContain(res.statusCode);
    });

    test('13. ลบหนังสือที่ไม่มีอยู่จริง ไม่ควร Error รุนแรง (Status 404)', async () => {
      const res = await request(app).delete('/api/books/999');
      expect(res.statusCode).toBe(404);
    });
  });
  // --- หมวดที่ 6: ระบบการยืมขั้นสูง (Borrowing Logic) ---
  describe('Borrowing System Extra', () => {
    test('14. ยืมหนังสือโดยไม่ส่ง bookId ควรได้ Status 400', async () => {
      const res = await request(app).post('/api/borrow').send({});
      expect(res.statusCode).toBe(400);
    });

    test('15. พยายามยืมหนังสือที่ถูกยืมไปแล้ว (Duplicate Borrow) ควรได้ Status 400/409', async () => {
      // เคสนี้สำคัญมากสำหรับ Business Logic
      const res = await request(app).post('/api/borrow').send({ bookId: 2 });
      expect([400, 409]).toContain(res.statusCode);
    });

    test('16. ยืมหนังสือด้วย Token ที่หมดอายุ ควรได้ Status 401', async () => {
      const res = await request(app).post('/api/borrow')
        .set('Authorization', 'Bearer expired-token')
        .send({ bookId: 1 });
      expect(res.statusCode).toBe(401);
    });
  });
});