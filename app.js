const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// เก็บข้อมูลกิจกรรมไว้ใน memory (ตัวอย่างง่าย ๆ)
let activities = [
  { id: 1, name: 'ตัวอย่าง', activity: 'เข้าเรียนวิชา DevOps', date: new Date().toISOString() }
];

// หน้าแรก
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ดูรายการกิจกรรมทั้งหมด (JSON)
app.get('/activities', (req, res) => {
  res.status(200).json(activities);
});

// เพิ่มกิจกรรมใหม่
app.post('/activities', (req, res) => {
  const { name, activity } = req.body;
  if (!name || !activity) {
    return res.status(400).json({ error: 'กรุณาระบุ name และ activity' });
  }
  const newItem = {
    id: activities.length + 1,
    name,
    activity,
    date: new Date().toISOString()
  };
  activities.push(newItem);
  res.status(201).json(newItem);
});

// เช็คสถานะระบบ (ใช้เทสได้ง่าย)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ให้ไฟล์อื่น (เช่น test) เรียก app ไปใช้ได้ โดยไม่รัน listen ทันที
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
