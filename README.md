# 🎓 AI Marketing Tutor - ระบบช่วยสอนการตลาด

ระบบแชทบอท LINE ที่ช่วยสอน ตอบคำถาม และให้ความรู้เกี่ยวกับการตลาด โดยใช้ ChatGPT และ AI สำหรับสร้างสื่อภาพประกอบ

## ✨ คุณสมบัติหลัก

- **💬 ตอบคำถามการตลาด**: ใช้ ChatGPT เพื่อตอบคำถามและอธิบายแนวคิดการตลาด
- **🎨 สร้างสื่อภาพ**: สร้างแผนภาพ 4P, STP, SWOT, Customer Journey ฯลฯ
- **📚 ประวัติการสนทนา**: เก็บประวัติการสนทนาเพื่อให้ AI เข้าใจบริบท
- **🔄 รองรับการสนทนาต่อเนื่อง**: ตอบคำถามหลายข้อตามลำดับ
- **📱 LINE Integration**: เชื่อมต่อกับ LINE Bot ได้โดยตรง

## 🚀 การติดตั้งและเรียกใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js v18 ขึ้นไป
- pnpm หรือ npm
- LINE Messaging API Channel
- OpenAI API Key

### ขั้นตอนการติดตั้ง

1. **Clone หรือ Download โปรเจกต์**
   ```bash
   cd ai-marketing-tutor
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   pnpm install
   ```

3. **ตั้งค่า Environment Variables**
   
   แก้ไขไฟล์ `.env` และเพิ่มข้อมูลต่อไปนี้:
   ```
   LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
   LINE_CHANNEL_SECRET=your_line_channel_secret
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   ```

4. **รันเซิร์ฟเวอร์**
   ```bash
   pnpm start
   ```

   หรือสำหรับการพัฒนา:
   ```bash
   pnpm dev
   ```

## 📋 วิธีการใช้งาน

### คำสั่งพื้นฐาน

| คำสั่ง | คำอธิบาย |
|--------|---------|
| `/help` | แสดงคำสั่งทั้งหมด |
| `/generate-image [ชื่อสื่อ]` | สร้างสื่อภาพ |
| `/reset` | รีเซ็ตประวัติการสนทนา |

### ตัวอย่างการใช้งาน

**ตัวอย่าง 1: ถามเกี่ยวกับ 4P**
```
ผู้ใช้: 4P ของการตลาดคืออะไร?
Bot: 4P ของการตลาด ประกอบด้วย...
```

**ตัวอย่าง 2: สร้างแผนภาพ 4P**
```
ผู้ใช้: /generate-image 4P
Bot: 🎨 กำลังสร้างสื่อภาพ "4P" โปรดรอสักครู่...
[ส่งภาพแผนภาพ 4P]
```

**ตัวอย่าง 3: ถามคำถามติดตามเพิ่มเติม**
```
ผู้ใช้: ช่วยอธิบายเพิ่มเติมเกี่ยวกับ Product ได้ไหม?
Bot: Product คือ... [ตอบตามบริบทของคำถามก่อนหน้า]
```

## 🔧 การตั้งค่า LINE Bot

### 1. สร้าง LINE Channel
- ไปที่ [LINE Developers Console](https://developers.line.biz/en/)
- สร้าง Provider และ Messaging API Channel
- คัดลอก Channel Access Token และ Channel Secret

### 2. ตั้งค่า Webhook URL
- ในส่วน Messaging API Settings
- ตั้ง Webhook URL เป็น: `https://your-domain.com/webhook`
- Enable Webhook

### 3. เพิ่ม Bot เป็นเพื่อน
- สแกน QR Code ของ Bot
- หรือค้นหา Bot ID ในแอป LINE

## 🎯 โครงสร้างโปรเจกต์

```
ai-marketing-tutor/
├── server.js                 # เซิร์ฟเวอร์หลัก
├── .env                      # ตัวแปรสภาพแวดล้อม
├── .env.example              # ตัวอย่าง .env
├── .gitignore                # ไฟล์ที่ไม่ต้อง commit
├── package.json              # Dependencies
├── README.md                 # เอกสารนี้
└── node_modules/             # Dependencies ที่ติดตั้ง
```

## 📚 เนื้อหาการตลาดที่รองรับ

ระบบสามารถตอบคำถามเกี่ยวกับ:

- **4P Marketing Mix** - Product, Price, Place, Promotion
- **STP Strategy** - Segmentation, Targeting, Positioning
- **SWOT Analysis** - Strengths, Weaknesses, Opportunities, Threats
- **Brand Management** - การสร้างและจัดการแบรนด์
- **Customer Journey** - เส้นทางการซื้อของลูกค้า
- **Digital Marketing** - การตลาดดิจิทัล
- **Content Marketing** - การตลาดด้วยเนื้อหา
- และอื่นๆ อีกมากมาย

## 🖼️ สื่อภาพที่สามารถสร้างได้

| ชื่อสื่อ | คำอธิบาย |
|---------|---------|
| `4P` | แผนภาพ 4P Marketing Mix |
| `STP` | แผนภาพ STP Strategy |
| `SWOT` | แผนภาพ SWOT Analysis |
| `Customer Journey` | Customer Journey Map |
| `Marketing Funnel` | Marketing Funnel Diagram |

## 🔐 ความปลอดภัย

- ไม่เก็บข้อมูลส่วนตัวของผู้ใช้
- ประวัติการสนทนาเก็บไว้ในหน่วยความจำเท่านั้น (ไม่บันทึกลงฐานข้อมูล)
- ใช้ LINE Bot SDK อย่างเป็นทางการ
- API Keys เก็บไว้ใน .env เท่านั้น

## 🐛 Troubleshooting

### ปัญหา: Bot ไม่ตอบข้อความ
**วิธีแก้:**
- ตรวจสอบ LINE_CHANNEL_ACCESS_TOKEN และ LINE_CHANNEL_SECRET
- ตรวจสอบ Webhook URL ถูกต้องหรือไม่
- ดูไฟล์ log ของเซิร์ฟเวอร์

### ปัญหา: ข้อความตอบไม่ถูกต้อง
**วิธีแก้:**
- ตรวจสอบ OPENAI_API_KEY
- ตรวจสอบว่า OpenAI Account มี credits เพียงพอ
- ลองพิมพ์ `/reset` เพื่อรีเซ็ตประวัติการสนทนา

### ปัญหา: ไม่สามารถสร้างภาพได้
**วิธีแก้:**
- ตรวจสอบ OPENAI_API_KEY มีสิทธิ์ใช้ DALL-E
- ตรวจสอบ OpenAI Account มี credits สำหรับ Image Generation

## 📞 การติดต่อและสนับสนุน

หากมีปัญหาหรือข้อเสนอแนะ โปรดติดต่อผู้พัฒนา

## 📄 ลิขสิทธิ์

โปรเจกต์นี้เป็น Open Source และสามารถใช้ได้อย่างอิสระ

## 🙏 ขอบคุณ

- LINE Messaging API
- OpenAI API
- Express.js Community

