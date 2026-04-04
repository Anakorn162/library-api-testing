const express = require('express');
const app = express();
app.use(express.json());

// ฐานข้อมูลจำลอง (Mock Database)
let books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", status: "available" },
    { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", status: "borrowed" }
];

// 1. GET /api/books - ดึงข้อมูลหนังสือทั้งหมด
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// 2. GET /api/books/:id - ดึงข้อมูลหนังสือตาม ID
app.get('/api/books/:id', (req, res) => {
    const id = req.params.id;
    // [BUG ที่ 1] ถ้าหา ID 99999 จะพังเป็น Error 500 แทนที่จะเป็น 404
    if (id === '99999') {
        return res.status(500).json({ error: "System Crashed! Unhandled Exception." });
    }
    
    const book = books.find(b => b.id == id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
});

// 3. POST /api/books - เพิ่มหนังสือใหม่
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    
    // [BUG ที่ 2] ไม่มีการ Validate ว่าห้ามส่งค่าว่าง (สามารถส่ง title เป็น "" แล้วบันทึกได้)
    if (author === undefined) {
        return res.status(400).json({ error: "Author is required" });
    }

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
        status: "available"
    };
    books.push(newBook);
    // [BUG ที่ 3] คืนค่า Status 200 OK แทนที่จะเป็น 201 Created สำหรับการสร้างข้อมูลใหม่
    res.status(200).json(newBook); 
});

// 4. PUT /api/books/:id - แก้ไขข้อมูลหนังสือ
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    // [BUG ที่ 4] ถ้าหาหนังสือไม่เจอ คืนค่า 200 เฉยเลย แทนที่จะเป็น 404
    if (index === -1) {
        return res.status(200).json({ message: "Update successful (but book doesn't exist!)" });
    }

    books[index] = { ...books[index], ...req.body };
    res.status(200).json(books[index]);
});

// 5. DELETE /api/books/:id - ลบหนังสือ
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(b => b.id !== id);

    if (books.length === initialLength) {
        return res.status(404).json({ error: "Book not found" });
    }
    // [BUG ที่ 5] ลบสำเร็จแต่ไม่ยอมคืนค่าอะไรเลย (ควรตอบ 204 No Content หรือ 200 พร้อมข้อความ)
    res.send(); 
});

// 6. GET /api/auth/login - ระบบ Login
app.get('/api/auth/login', (req, res) => {
    const { username, password } = req.query;

    // [BUG ที่ 6] จำลองช่องโหว่ SQL Injection ง่ายๆ ถ้าใส่ username มีคำว่า OR 1=1 ให้ผ่านเลย
    if (username && username.includes("OR 1=1")) {
        return res.status(200).json({ token: "fake-admin-token-12345", message: "Hacked logged in!" });
    }

    if (username === 'admin' && password === 'password') {
        return res.status(200).json({ token: "valid-token-67890" });
    }

    res.status(401).json({ error: "Unauthorized" });
});

// 7. POST /api/borrow - ยืมหนังสือ
app.post('/api/borrow', (req, res) => {
    const token = req.headers['authorization'];
    const { bookId } = req.body;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    const book = books.find(b => b.id == bookId);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    // [BUG ที่ 7] ไม่เช็คว่าหนังสือโดนยืมไปแล้ว (status: 'borrowed') สามารถยืมซ้ำได้เรื่อยๆ
    book.status = "borrowed";
    res.status(200).json({ message: "Book borrowed successfully", book });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Mock API Server is running on http://localhost:${PORT}`);
});