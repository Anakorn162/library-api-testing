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

📁 ขั้นตอนที่ 1: สร้างโฟลเดอร์และเริ่มต้นโปรเจกต์ (Initialize Project)
เป้าหมาย: สร้างพื้นที่ทำงานและบอกให้ Node.js รู้จักโปรเจกต์ของเรา

สร้างโฟลเดอร์ใหม่ในคอมพิวเตอร์ (เช่น ตั้งชื่อว่า library-api-testing)

เปิดโปรแกรม VS Code แล้วลากโฟลเดอร์นี้ไปปล่อยเพื่อเปิดการทำงาน

เปิด Terminal ใน VS Code (ไปที่เมนู Terminal -> New Terminal)

พิมพ์คำสั่งนี้เพื่อสร้างไฟล์ package.json (ไฟล์จัดการโปรเจกต์):

Bash
npm init -y
📦 ขั้นตอนที่ 2: ติดตั้งเครื่องมือหลักและเครื่องมือทดสอบ (Install Dependencies)
เป้าหมาย: โหลดแพ็กเกจที่จำเป็นต้องใช้ในการสร้าง API และทำ Automated Test

ติดตั้ง Express.js สำหรับทำเซิร์ฟเวอร์และ API:

Bash
npm install express
ติดตั้ง Jest และ Supertest สำหรับใช้เขียนโค้ดทดสอบ (Test):

Bash
npm install --save-dev jest supertest
(เมื่อติดตั้งเสร็จ จะมีโฟลเดอร์ node_modules โผล่ขึ้นมา)

📂 ขั้นตอนที่ 3: สร้างโครงสร้างไฟล์ (Create Folder Structure)
เป้าหมาย: จัดระเบียบไฟล์ให้เป็นหมวดหมู่ เพื่อง่ายต่อการหาโค้ดและรันเทส

สร้างโฟลเดอร์ชื่อ src * ด้านในให้สร้างไฟล์ server.js (สำหรับเขียน API)

และไฟล์ bookLogic.js (สำหรับเขียนตรรกะเงื่อนไขต่างๆ)

สร้างโฟลเดอร์ชื่อ tests * ด้านในให้สร้างโฟลเดอร์ย่อยชื่อ integration และสร้างไฟล์ api.test.js ในนั้น

สร้างโฟลเดอร์ย่อยชื่อ unit และสร้างไฟล์ bookLogic.test.js ในนั้น

⚙️ ขั้นตอนที่ 4: ตั้งค่าคำสั่งรันใน package.json (Setup Scripts)
เป้าหมาย: สร้างคำสั่งสั้นๆ เพื่อให้เราพิมพ์รันเซิร์ฟเวอร์หรือรันเทสได้ง่ายๆ

เปิดไฟล์ package.json ขึ้นมา

มองหาหัวข้อ "scripts" แล้วแก้ให้เป็นแบบนี้ครับ:

JSON
"scripts": {
  "start": "node src/server.js",
  "test": "jest",
  "coverage": "jest --coverage"
}
กด Save (Ctrl + S)

🚀 ขั้นตอนที่ 5: เปิดรันเซิร์ฟเวอร์ (Start the Server)
เป้าหมาย: หลังจากที่เขียนโค้ดใน server.js เสร็จแล้ว เราจะเปิดให้ API เริ่มทำงาน

ใน Terminal ให้พิมพ์คำสั่ง:

Bash
npm start
ระบบจะขึ้นข้อความเตือนว่า Server ทำงานแล้ว (ห้ามปิดหน้าต่างนี้หากต้องการยิง Postman)

🧪 ขั้นตอนที่ 6: รันการทดสอบ (Run Tests)
เป้าหมาย: สั่งให้ระบบเริ่มรันเคสทดสอบที่เราเขียนไว้ทั้งหมด

กดเปิด Terminal หน้าต่างใหม่ (กดเครื่องหมาย +)

พิมพ์คำสั่งรันเทส:

Bash
npm run coverage
รอระบบตรวจสอบ จะได้ผลลัพธ์ Pass/Fail และตาราง % Coverage ขึ้นมาครับ
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