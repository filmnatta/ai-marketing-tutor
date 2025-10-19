# 📖 คู่มือการตั้งค่า AI Marketing Tutor

คู่มือนี้จะช่วยให้คุณตั้งค่า AI Marketing Tutor ให้พร้อมใช้งาน

## 📋 ข้อกำหนดเบื้องต้น

- Node.js v18 ขึ้นไป
- pnpm (หรือ npm/yarn)
- LINE Messaging API Channel
- OpenAI API Key
- Ngrok หรือบริการ Tunneling อื่นๆ (สำหรับการทดสอบในเครื่อง)

## 🔑 ขั้นตอนที่ 1: สร้าง OpenAI API Key

### 1.1 ไปที่ OpenAI Platform
- เข้าไปที่ [https://platform.openai.com/](https://platform.openai.com/)
- ล็อกอินหรือสร้างบัญชีใหม่

### 1.2 สร้าง API Key
1. ไปที่ **API keys** ในเมนูด้านซ้าย
2. คลิก **Create new secret key**
3. คัดลอก API Key (จะแสดงเพียงครั้งเดียว)
4. เก็บไว้ในที่ปลอดภัย

### 1.3 ตั้งค่า Billing
- ตรวจสอบว่ามี Credits หรือ Payment Method
- ตั้งค่า Usage Limits (ถ้าต้องการ)

## 📱 ขั้นตอนที่ 2: สร้าง LINE Messaging API Channel

### 2.1 ไปที่ LINE Developers
- เข้าไปที่ [https://developers.line.biz/en/](https://developers.line.biz/en/)
- ล็อกอินด้วยบัญชี LINE

### 2.2 สร้าง Provider
1. คลิก **Create**
2. เลือก **Provider**
3. ใส่ชื่อ Provider (เช่น "My Marketing Tutor")
4. คลิก **Create**

### 2.3 สร้าง Messaging API Channel
1. ไปที่ Provider ที่สร้างขึ้น
2. คลิก **Create a new channel**
3. เลือก **Messaging API**
4. ใส่ข้อมูล:
   - **Channel name**: AI Marketing Tutor
   - **Channel description**: ระบบช่วยสอนการตลาด
   - **Category**: Education
   - **Subcategory**: Educational service
5. ยอมรับเงื่อนไขและคลิก **Create**

### 2.4 ดึง Channel Credentials
1. ไปที่ **Messaging API** tab
2. ค้นหา:
   - **Channel Access Token** - คลิก **Issue** ถ้ายังไม่มี
   - **Channel Secret** - ดูในส่วน Basic Settings

### 2.5 สร้าง LINE Official Account
1. ไปที่ **Messaging API** tab
2. ดูส่วน **LINE Official Account**
3. คลิก **Create** เพื่อสร้าง Official Account ใหม่

## 🌐 ขั้นตอนที่ 3: ตั้งค่า Webhook

### 3.1 สำหรับการทดสอบในเครื่อง (ใช้ Ngrok)
```bash
# ติดตั้ง Ngrok
# ดาวน์โหลดจาก https://ngrok.com/download

# รันเซิร์ฟเวอร์ของเรา (ในเทอร์มินัลแรก)
pnpm start

# เปิด Ngrok ในเทอร์มินัลใหม่
ngrok http 3000

# คัดลอก URL ที่ได้ (เช่น https://abc123.ngrok.io)
```

### 3.2 ตั้งค่า Webhook URL ใน LINE
1. ไปที่ LINE Developers Console
2. เลือก Messaging API Channel
3. ไปที่ **Messaging API** tab
4. หา **Webhook URL**
5. ใส่ URL: `https://your-ngrok-url.ngrok.io/webhook`
6. คลิก **Verify** เพื่อทดสอบ
7. Enable **Use webhook**

### 3.3 สำหรับการ Deploy ที่ Production
- ใช้บริการ Hosting เช่น Heroku, Railway, Render
- ตั้ง Webhook URL เป็น URL ของเซิร์ฟเวอร์จริง

## ⚙️ ขั้นตอนที่ 4: ตั้งค่า Environment Variables

### 4.1 สร้างไฟล์ .env
```bash
cp .env.example .env
```

### 4.2 แก้ไขไฟล์ .env
```env
# LINE Bot Configuration
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
LINE_CHANNEL_SECRET=your_channel_secret

# OpenAI Configuration
OPENAI_API_KEY=sk-your_api_key

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 🚀 ขั้นตอนที่ 5: ติดตั้งและรัน

### 5.1 ติดตั้ง Dependencies
```bash
pnpm install
```

### 5.2 รันเซิร์ฟเวอร์
```bash
# สำหรับพัฒนา
pnpm dev

# หรือสำหรับ Production
pnpm start
```

### 5.3 ตรวจสอบสถานะ
```bash
# ในเบราว์เซอร์หรือ Terminal อื่น
curl http://localhost:3000/health
```

ควรได้ผลลัพธ์:
```json
{"status":"OK","message":"AI Marketing Tutor is running"}
```

## 📱 ขั้นตอนที่ 6: ทดสอบ Bot

### 6.1 เพิ่ม Bot เป็นเพื่อน
1. ไปที่ LINE Developers Console
2. ไปที่ **Messaging API** tab
3. ดูส่วน **LINE Official Account**
4. สแกน QR Code หรือค้นหา Bot ID

### 6.2 ส่งข้อความทดสอบ
- พิมพ์ `/help` เพื่อดูคำสั่งทั้งหมด
- ถามคำถาง: "4P ของการตลาดคืออะไร?"
- ลองสร้างภาพ: `/generate-image 4P`

## 🔍 Troubleshooting

### Bot ไม่ตอบข้อความ
**ตรวจสอบ:**
1. ตรวจสอบ Channel Access Token ถูกต้องหรือไม่
2. ตรวจสอบ Webhook URL ถูกต้องหรือไม่
3. ตรวจสอบเซิร์ฟเวอร์กำลังรันอยู่หรือไม่
4. ดูไฟล์ log ของเซิร์ฟเวอร์

### OpenAI API Error
**ตรวจสอบ:**
1. ตรวจสอบ API Key ถูกต้องหรือไม่
2. ตรวจสอบ Account มี Credits เพียงพอหรือไม่
3. ตรวจสอบ API Key ไม่ได้ถูกเปิดเผย

### Image Generation ไม่ทำงาน
**ตรวจสอบ:**
1. ตรวจสอบ OpenAI Account รองรับ DALL-E หรือไม่
2. ตรวจสอบ Account มี Credits สำหรับ Image Generation หรือไม่

## 📚 ทรัพยากรเพิ่มเติม

- [LINE Messaging API Documentation](https://developers.line.biz/en/docs/messaging-api/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

## ✅ Checklist การตั้งค่า

- [ ] สร้าง OpenAI API Key
- [ ] สร้าง LINE Messaging API Channel
- [ ] ดึง Channel Access Token และ Channel Secret
- [ ] ตั้งค่า Webhook URL
- [ ] สร้างไฟล์ .env พร้อมข้อมูลทั้งหมด
- [ ] ติดตั้ง Dependencies
- [ ] รันเซิร์ฟเวอร์และตรวจสอบสถานะ
- [ ] เพิ่ม Bot เป็นเพื่อน
- [ ] ทดสอบการทำงาน

## 🎉 เสร็จแล้ว!

ตอนนี้ AI Marketing Tutor ของคุณพร้อมใช้งานแล้ว!

หากมีปัญหา โปรดดู Troubleshooting หรือติดต่อผู้พัฒนา

