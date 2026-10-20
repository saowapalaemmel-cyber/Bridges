const fs = require('fs');
const path = require('path');

const ordersFile = path.join(__dirname, 'orders.json');

// อ่าน Order จากไฟล์
function loadOrders() {
  try {
    const data = fs.readFileSync(ordersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fs.writeFileSync(ordersFile, '[]', 'utf8');
      return [];
    }

    throw error;
  }
}

// โหลดข้อมูลทันทีเมื่อเริ่ม Server
const orders = loadOrders();

// บันทึกข้อมูลลงไฟล์
function saveOrders() {
  fs.writeFileSync(
    ordersFile,
    JSON.stringify(orders, null, 2),
    'utf8'
  );
}

// ส่งออกทั้งสองอย่างให้ server.js ใช้
module.exports = { orders, saveOrders };