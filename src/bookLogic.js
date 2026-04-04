// src/bookLogic.js
function calculateFine(daysOverdue) {
  if (daysOverdue <= 0) return 0;
  return daysOverdue * 10; // ปรับวันละ 10 บาท
}
module.exports = { calculateFine };