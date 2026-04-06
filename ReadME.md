# 📚 Library Management System API - Testing Project

โปรเจกต์นี้เป็นการพัฒนาระบบ API สำหรับจัดการห้องสมุด (Library Management System) โดยมีจุดประสงค์หลักเพื่อการศึกษาระบบ **Software Testing**, **Quality Assurance (QA)** และ **Security Vulnerabilities** ภายในโปรเจกต์ประกอบไปด้วยระบบ Automated Tests และมีการเจตนาฝังข้อผิดพลาด (Intentional Bugs) จำนวน 15 รายการ เพื่อจำลองสถานการณ์การทดสอบระบบและการค้นหาช่องโหว่ด้านความปลอดภัย (เช่น SQL Injection, Broken Access Control)

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Testing Framework:** Jest
* **API Testing:** Supertest
* **Tools:** Postman (สำหรับการทำ Manual Testing)

---

## 🚀 การติดตั้งและการรันโปรเจกต์ (Installation & Setup)

1. **Clone repository**
   ```bash
   git clone [https://github.com/USERNAME/library-api-testing.git](https://github.com/USERNAME/library-api-testing.git)
   cd library-api-testing
ติดตั้ง Dependencies

Bash
npm install
รันเซิร์ฟเวอร์ (Start the server)

Bash
node src/server.js
เซิร์ฟเวอร์จะรันอยู่ที่พอร์ต http://localhost:3000

🧪 การทดสอบระบบ (Running Tests)
โปรเจกต์นี้ใช้ Jest และ Supertest ในการทำ Automated Testing ทั้งในระดับ Unit Test และ Integration Test

รันชุดทดสอบทั้งหมด:

Bash
npm test
รันเพื่อดูรายงานความครอบคลุมของโค้ด (Code Coverage):

Bash
npm run coverage
(เป้าหมาย Code Coverage ของโปรเจกต์นี้คือ > 80%)

📡 สรุป API Endpoints (API Documentation)
🔐 Authentication
POST /api/auth/login - ล็อกอินเพื่อรับ Token

📖 Books Management
GET /api/books - ดึงข้อมูลหนังสือทั้งหมด

GET /api/books/:id - ดึงข้อมูลหนังสือตาม ID

POST /api/books - สร้างข้อมูลหนังสือใหม่

PUT /api/books/:id - แก้ไขข้อมูลหนังสือ

DELETE /api/books/:id - ลบข้อมูลหนังสือ

🤝 Borrowing System
POST /api/borrow - ทำรายการยืมหนังสือ

🐞 รายการข้อผิดพลาดที่จำลองไว้ (Known Intentional Bugs)
โปรเจกต์นี้ได้จำลองช่องโหว่และข้อผิดพลาดไว้ทั้งหมด 15 รายการ เพื่อใช้สำหรับการเรียนรู้วิชา Software Testing ตัวอย่างบั๊กที่สำคัญ ได้แก่:

[Critical] BUG-001: ช่องโหว่ SQL Injection ผ่านหน้า Login (' OR '1'='1)

[Critical] BUG-002: ไม่มี Input Sanitization ทำให้เสี่ยงต่อ XSS

[High] BUG-004: ระบบยอมให้สร้างหนังสือโดยไม่ระบุชื่อ (ขาด Validation)

[High] BUG-015: สามารถใช้ Token ที่หมดอายุหรือ Token ปลอมในการทำรายการได้

(ดูรายละเอียดบั๊กทั้งหมดและการทดสอบ 60 Test Cases ได้ในรายงานผลการทดสอบของโปรเจกต์)

👨‍💻 ผู้พัฒนา (Contributors)
66160017 นายกรวิชญ์  ปานรัตน์
66160150 นายรุจิภาส  ปัญญาชน 
66160162 นายอาณกร  มงคลแถลง 