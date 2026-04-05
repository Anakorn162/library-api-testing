// tests/unit/bookLogic.test.js
const { validateNewBook, checkBorrowStatus, calculateLateFee } = require('../../src/bookLogic');

describe('Unit Test: Book Business Logic', () => {

    // --- หมวดที่ 1: validateNewBook (5 Tests) ---
    describe('validateNewBook()', () => {
        test('1. ข้อมูลถูกต้องครบถ้วน ต้องผ่าน (isValid: true)', () => {
            const result = validateNewBook("Clean Code", "Robert C. Martin");
            expect(result.isValid).toBe(true);
        });

        test('2. ไม่ส่งทั้ง title และ author ต้องแจ้งเตือน', () => {
            const result = validateNewBook(null, null);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Title and Author are required");
        });

        test('3. ไม่ส่ง title อย่างเดียว ต้องแจ้งเตือน', () => {
            const result = validateNewBook("", "Robert C. Martin");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Title is required");
        });

        test('4. ส่ง title เป็นตัวเลข (ผิดประเภท) ต้องแจ้งเตือน', () => {
            const result = validateNewBook(12345, "Robert C. Martin");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Title must be a text");
        });

        test('5. ชื่อหนังสือสั้นกว่า 3 ตัวอักษร ต้องแจ้งเตือน', () => {
            const result = validateNewBook("IT", "Stephen King");
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Title is too short");
        });
    });

    // --- หมวดที่ 2: checkBorrowStatus (5 Tests) ---
    describe('checkBorrowStatus()', () => {
        test('6. มี Token และหนังสือว่าง ต้องยืมได้', () => {
            const result = checkBorrowStatus('available', true);
            expect(result.canBorrow).toBe(true);
        });

        test('7. ไม่มี Token (ไม่ได้ล็อกอิน) ต้องยืมไม่ได้', () => {
            const result = checkBorrowStatus('available', false);
            expect(result.canBorrow).toBe(false);
            expect(result.reason).toBe("Unauthorized");
        });

        test('8. หนังสือถูกยืมไปแล้ว (borrowed) ต้องยืมซ้ำไม่ได้', () => {
            const result = checkBorrowStatus('borrowed', true);
            expect(result.canBorrow).toBe(false);
            expect(result.reason).toBe("Book already borrowed");
        });

        test('9. หนังสืออยู่ระหว่างซ่อมบำรุง (maintenance) ต้องยืมไม่ได้', () => {
            const result = checkBorrowStatus('maintenance', true);
            expect(result.canBorrow).toBe(false);
            expect(result.reason).toBe("Book is under maintenance");
        });

        test('10. หนังสือสูญหาย (lost) ต้องยืมไม่ได้', () => {
            const result = checkBorrowStatus('lost', true);
            expect(result.canBorrow).toBe(false);
            expect(result.reason).toBe("Book is lost");
        });
    });

    // --- หมวดที่ 3: calculateLateFee (5 Tests) ---
    describe('calculateLateFee()', () => {
        test('11. คืนตรงเวลา (0 วัน) ต้องไม่มีค่าปรับ', () => {
            expect(calculateLateFee(0)).toBe(0);
        });

        test('12. ส่งคืนก่อนกำหนด (ค่าติดลบ) ต้องไม่มีค่าปรับ', () => {
            expect(calculateLateFee(-2)).toBe(0);
        });

        test('13. คืนช้า 5 วัน (อยู่ในช่วง 7 วันแรก) ค่าปรับวันละ 10 บาท', () => {
            expect(calculateLateFee(5)).toBe(50); // 5 * 10
        });

        test('14. คืนช้า 7 วันพอดี ต้องปรับ 70 บาท', () => {
            expect(calculateLateFee(7)).toBe(70); // 7 * 10
        });

        test('15. คืนช้า 10 วัน (เกิน 7 วันแรก) คิดเรท 20 บาทตั้งแต่วันที่ 8 เป็นต้นไป', () => {
            // 7 วันแรก = 70 บาท, 3 วันหลัง = 60 บาท -> รวม 130 บาท
            expect(calculateLateFee(10)).toBe(130); 
        });
    });

});