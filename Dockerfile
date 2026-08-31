# ใช้ Node.js เวอร์ชัน 18 แบบ alpine (ขนาดเล็ก)
FROM node:18-alpine

# กำหนดโฟลเดอร์ทำงานภายในคอนเทนเนอร์
WORKDIR /app

# คัดลอกไฟล์ package.json มาก่อน เพื่อให้ Docker cache การ install ได้
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install --production

# คัดลอกไฟล์ที่เหลือทั้งหมดเข้าไปในคอนเทนเนอร์
COPY . .

# เปิดพอร์ต 3000 ให้เข้าถึงจากภายนอกได้
EXPOSE 3000

# คำสั่งที่จะรันเมื่อคอนเทนเนอร์เริ่มทำงาน
CMD ["node", "app.js"]
