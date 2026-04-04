// tests/unit/bookLogic.test.js
const { calculateFine } = require('../../src/bookLogic');

describe('Unit Test: การคำนวณค่าปรับ', () => {
  test('คืนตรงเวลา ต้องไม่มีค่าปรับ (0 บาท)', () => {
    expect(calculateFine(0)).toBe(0);
  });

  test('คืนช้า 3 วัน ต้องโดนปรับ 30 บาท', () => {
    expect(calculateFine(3)).toBe(30);
  });
});