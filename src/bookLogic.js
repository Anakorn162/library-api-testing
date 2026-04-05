// src/bookLogic.js

// 1. ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลหนังสือก่อนบันทึก
const validateNewBook = (title, author) => {
    if (!title && !author) return { isValid: false, error: "Title and Author are required" };
    if (!title) return { isValid: false, error: "Title is required" };
    if (!author) return { isValid: false, error: "Author is required" };
    if (typeof title !== 'string') return { isValid: false, error: "Title must be a text" };
    if (title.length < 3) return { isValid: false, error: "Title is too short" };
    return { isValid: true };
};

// 2. ฟังก์ชันตรวจสอบสิทธิ์การยืมหนังสือ
const checkBorrowStatus = (bookStatus, hasToken) => {
    if (!hasToken) return { canBorrow: false, reason: "Unauthorized" };
    if (bookStatus === 'borrowed') return { canBorrow: false, reason: "Book already borrowed" };
    if (bookStatus === 'maintenance') return { canBorrow: false, reason: "Book is under maintenance" };
    if (bookStatus === 'lost') return { canBorrow: false, reason: "Book is lost" };
    return { canBorrow: true };
};

// 3. ฟังก์ชันคำนวณค่าปรับส่งหนังสือล่าช้า (สมมติ: 7 วันแรก วันละ 10 บาท, หลังจากนั้นวันละ 20 บาท)
const calculateLateFee = (daysLate) => {
    if (typeof daysLate !== 'number' || daysLate < 0) return 0;
    if (daysLate <= 7) return daysLate * 10;
    return (7 * 10) + ((daysLate - 7) * 20); 
};

module.exports = { validateNewBook, checkBorrowStatus, calculateLateFee };