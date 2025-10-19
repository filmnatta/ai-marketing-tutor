# 🤖 สถาปัตยกรรม AI ในโปรเจกต์ AI Marketing Tutor

เอกสารนี้อธิบายการทำงานของ AI แต่ละตัวในระบบ

---

## 📋 สารบัญ

1. [ChatGPT (OpenAI)](#1-chatgpt-openai)
2. [DALL-E (Image Generation)](#2-dall-e-image-generation)
3. [Manus AI (Development)](#3-manus-ai-development)
4. [การไหลของข้อมูล](#การไหลของข้อมูล)
5. [ตัวอย่างการทำงาน](#ตัวอย่างการทำงาน)

---

## 1. ChatGPT (OpenAI)

### 🎯 บทบาท
เป็น **หัวใจหลัก** ของระบบ ช่วยตอบคำถามและให้ความรู้เกี่ยวกับการตลาด

### 📍 ตำแหน่งในระบบ
```
User Input
    ↓
[Web Chat / LINE Bot]
    ↓
[Node.js Server]
    ↓
[ChatGPT API] ← ตรงนี้
    ↓
Response to User
```

### 🔧 วิธีการทำงาน

#### 1.1 การส่งคำถาม
```javascript
// ใน server.js
const response = await openai.chat.completions.create({
  model: "gpt-4-mini",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ],
  temperature: 0.7,
  max_tokens: 1000
});
```

#### 1.2 System Prompt
```
"คุณเป็นครูสอนการตลาดที่มีประสบการณ์ 20 ปี
ตอบคำถามเกี่ยวกับ:
- 4P Marketing Mix
- STP Strategy
- SWOT Analysis
- Brand Management
- Customer Journey
- Marketing Funnel
ใช้ภาษาไทยและยกตัวอย่างที่เข้าใจง่าย"
```

#### 1.3 ประวัติการสนทนา (Context)
```javascript
// เก็บประวัติเพื่อให้ AI เข้าใจบริบท
conversationHistory.set(userId, [
  { role: "user", content: "4P คืออะไร?" },
  { role: "assistant", content: "4P ประกอบด้วย..." },
  { role: "user", content: "ช่วยยกตัวอย่างให้ฟังหน่อยได้ไหม?" },
  { role: "assistant", content: "ตัวอย่าง iPhone..." }
]);
```

### 💬 ตัวอย่างการทำงาน

**Input:**
```
ผู้ใช้: "4P ของการตลาดคืออะไร?"
```

**Process:**
1. Server รับข้อความจากผู้ใช้
2. ส่งไปยัง ChatGPT API พร้อม system prompt
3. ChatGPT ประมวลผลและตอบ
4. Server ส่งคำตอบกลับไปยังผู้ใช้

**Output:**
```
ChatGPT: "4P ของการตลาด (Marketing Mix) ประกอบด้วย:

1. Product (สินค้า) - สินค้าหรือบริการที่คุณขาย
2. Price (ราคา) - ราคาที่กำหนด
3. Place (สถานที่) - ช่องทางการจัดจำหน่าย
4. Promotion (การส่งเสริม) - การโฆษณาและส่งเสริมการขาย

ตัวอย่าง: iPhone ของ Apple..."
```

### 🎛️ พารามิเตอร์ที่สำคัญ

| พารามิเตอร์ | ค่า | คำอธิบาย |
|-----------|-----|---------|
| **model** | gpt-4-mini | รุ่น ChatGPT ที่ใช้ |
| **temperature** | 0.7 | ความสร้างสรรค์ (0-1) |
| **max_tokens** | 1000 | จำนวนคำสูงสุด |
| **top_p** | 1 | Diversity ของคำตอบ |

### 📊 Cost Estimation

```
Input: $0.15 per 1M tokens
Output: $0.60 per 1M tokens

ตัวอย่าง:
- 100 คำถาม × 100 tokens = 10,000 tokens
- Cost ≈ $0.0015 (ประมาณ 0.05 บาท)
```

---

## 2. DALL-E (Image Generation)

### 🎨 บทบาท
สร้าง **สื่อภาพประกอบ** เพื่อให้ผู้เรียนเข้าใจแนวคิดได้ดีขึ้น

### 📍 ตำแหน่งในระบบ
```
User Command: "/generate-image 4P"
    ↓
[Node.js Server]
    ↓
[DALL-E API] ← ตรงนี้
    ↓
[Image URL]
    ↓
Display in Chat
```

### 🔧 วิธีการทำงาน

#### 2.1 การส่งคำสั่งสร้างภาพ
```javascript
// ใน server.js
const image = await openai.images.generate({
  model: "dall-e-3",
  prompt: "Create a marketing mix 4P diagram...",
  n: 1,
  size: "1024x1024",
  quality: "standard"
});
```

#### 2.2 Prompt Templates
```javascript
const prompts = {
  '4P': `Create a professional marketing mix 4P diagram showing:
    - Product (สินค้า)
    - Price (ราคา)
    - Place (สถานที่)
    - Promotion (การส่งเสริม)
    Use Thai text labels and modern design.`,
    
  'STP': `Create a Segmentation, Targeting, Positioning diagram
    showing market segments, target audience, and brand positioning.
    Use Thai text labels.`,
    
  'SWOT': `Create a SWOT Analysis matrix showing:
    - Strengths (จุดแข็ง)
    - Weaknesses (จุดอ่อน)
    - Opportunities (โอกาส)
    - Threats (ภัยคุกคาม)
    Use Thai text labels.`,
    
  'Customer Journey': `Create a customer journey map showing stages:
    - Awareness (การรับรู้)
    - Consideration (การพิจารณา)
    - Decision (การตัดสินใจ)
    - Retention (การรักษา)
    Use icons and Thai text.`,
    
  'Marketing Funnel': `Create a marketing funnel diagram showing:
    - Awareness (การรับรู้)
    - Interest (ความสนใจ)
    - Consideration (การพิจารณา)
    - Conversion (การแปลง)
    - Loyalty (ความจงรักษ์)
    Use Thai text labels.`
};
```

### 💬 ตัวอย่างการทำงาน

**Input:**
```
ผู้ใช้: "/generate-image 4P"
```

**Process:**
1. Server ตรวจสอบคำสั่ง
2. เลือก prompt สำหรับ 4P
3. ส่งไปยัง DALL-E API
4. DALL-E สร้างภาพ
5. ส่ง URL ของภาพกลับมา
6. Display ในแชท

**Output:**
```
🎨 สร้างสื่อภาพ "4P" เสร็จแล้ว
[แสดงภาพแผนภาพ 4P]
```

### 🎛️ พารามิเตอร์ที่สำคัญ

| พารามิเตอร์ | ค่า | คำอธิบาย |
|-----------|-----|---------|
| **model** | dall-e-3 | รุ่น DALL-E ที่ใช้ |
| **size** | 1024x1024 | ขนาดภาพ |
| **quality** | standard | คุณภาพ (standard/hd) |
| **n** | 1 | จำนวนภาพที่สร้าง |

### 📊 Cost Estimation

```
DALL-E-3 (1024x1024):
- Standard: $0.040 per image
- HD: $0.080 per image

ตัวอย่าง:
- 10 ภาพต่อวัน × $0.040 = $0.40/วัน
- ≈ $12/เดือน
```

### ⚠️ Fallback Mechanism

ถ้า DALL-E ไม่พร้อม ระบบจะใช้ placeholder:
```javascript
return `https://via.placeholder.com/1024x1024?text=${imageType}+Diagram`;
```

---

## 3. Manus AI (Development)

### 🧠 บทบาท
เป็น **AI ผู้พัฒนา** ที่ช่วยสร้างและปรับปรุงระบบทั้งหมด

### 📍 ตำแหน่งในระบบ
```
Requirements
    ↓
[Manus AI] ← ตรงนี้
    ↓
Code Generation
    ↓
Testing & Deployment
```

### 🔧 วิธีการทำงาน

#### 3.1 ขั้นตอนการพัฒนา

**Phase 1: Design & Planning**
```
- ออกแบบสถาปัตยกรรม
- วางแผน Database Schema
- สร้าง API Endpoints
```

**Phase 2: Backend Development**
```javascript
// Manus สร้าง server.js
import express from 'express';
import { Client } from '@line/bot-sdk';
import { OpenAI } from 'openai';

const app = express();
const lineClient = new Client({...});
const openai = new OpenAI({...});

app.post('/webhook', async (req, res) => {
  // Handle LINE messages
});

app.post('/api/chat', async (req, res) => {
  // Handle web chat
});
```

**Phase 3: Frontend Development**
```html
<!-- Manus สร้าง public/index.html -->
<div class="chat-container">
  <div class="messages"></div>
  <input type="text" placeholder="พิมพ์ข้อความ...">
  <button>ส่ง</button>
</div>
```

**Phase 4: Integration**
```javascript
// Manus เชื่อมต่อ ChatGPT + DALL-E
const response = await openai.chat.completions.create({...});
const image = await openai.images.generate({...});
```

**Phase 5: Deployment**
```
- สร้าง Dockerfile
- Push ไปยัง GitHub
- Deploy ไปยัง Render/Vercel
```

#### 3.2 ไฟล์ที่ Manus สร้าง

| ไฟล์ | บรรทัด | คำอธิบาย |
|------|--------|---------|
| **server.js** | 250+ | Backend หลัก |
| **public/index.html** | 400+ | Frontend UI |
| **marketing-knowledge.js** | 150+ | Knowledge Base |
| **Dockerfile** | 15 | Docker Config |
| **package.json** | 30 | Dependencies |
| **เอกสาร** | 1000+ | README, Guides |

#### 3.3 ความสามารถของ Manus

```
✅ Code Generation - เขียน code อัตโนมัติ
✅ Architecture Design - ออกแบบระบบ
✅ Integration - เชื่อมต่อ APIs
✅ Testing - ทดสอบระบบ
✅ Deployment - Deploy ไปยัง Cloud
✅ Documentation - เขียนเอกสาร
✅ Debugging - แก้ไขปัญหา
✅ Optimization - ปรับปรุงประสิทธิภาพ
```

---

## การไหลของข้อมูล

### 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                          │
└────────────┬────────────────────────────────────────────────┘
             │
             ├─── LINE Bot ──┐
             │               │
             └─── Web Chat ──┤
                             │
                    ┌────────▼─────────┐
                    │   Node.js Server │
                    │   (Express.js)   │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
    ┌────────┐         ┌──────────┐        ┌──────────┐
    │ChatGPT │         │ DALL-E  │        │Database  │
    │(Text)  │         │(Images) │        │(History) │
    └────────┘         └──────────┘        └──────────┘
        │                    │
        └────────────────────┼────────────────────┐
                             │
                    ┌────────▼─────────┐
                    │   Response       │
                    │   - Text         │
                    │   - Images       │
                    │   - Context      │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   Display to     │
                    │   User           │
                    └──────────────────┘
```

---

## ตัวอย่างการทำงาน

### 📌 Scenario 1: ถามคำถาม

```
User: "4P ของการตลาดคืออะไร?"
  │
  ├─ [Server] รับข้อความ
  │
  ├─ [ChatGPT] ตอบคำถาม
  │   "4P ประกอบด้วย Product, Price, Place, Promotion"
  │
  ├─ [Server] เก็บประวัติ
  │
  └─ [Display] แสดงคำตอบ

Time: ~1-2 seconds
```

### 📌 Scenario 2: สร้างภาพ

```
User: "/generate-image 4P"
  │
  ├─ [Server] ตรวจสอบคำสั่ง
  │
  ├─ [DALL-E] สร้างภาพ
  │   "4P Marketing Mix Diagram"
  │
  ├─ [Server] เก็บ URL
  │
  └─ [Display] แสดงภาพ

Time: ~10-20 seconds
```

### 📌 Scenario 3: ติดตามคำถาม

```
User: "ช่วยยกตัวอย่างให้ฟังหน่อยได้ไหม?"
  │
  ├─ [Server] ดึงประวัติ
  │   "เดิมถาม 4P"
  │
  ├─ [ChatGPT] ตอบโดยรู้บริบท
  │   "ตัวอย่าง iPhone: Product = iPhone, Price = 30,000 บาท..."
  │
  ├─ [Server] เก็บประวัติ
  │
  └─ [Display] แสดงคำตอบ

Time: ~1-2 seconds
```

---

## 🔐 Security & Best Practices

### API Keys Management
```javascript
// ✅ ถูกต้อง - ใช้ environment variables
const apiKey = process.env.OPENAI_API_KEY;

// ❌ ผิด - hardcode ใน code
const apiKey = "sk-xxxxx";
```

### Rate Limiting
```javascript
// ป้องกัน abuse
const rateLimiter = new Map();

if (rateLimiter.get(userId) > 100) {
  return "Too many requests";
}
```

### Error Handling
```javascript
try {
  const response = await openai.chat.completions.create({...});
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    // Handle rate limit
  } else if (error.code === 'invalid_api_key') {
    // Handle invalid key
  }
}
```

---

## 📊 Performance Metrics

| Metric | Value | Note |
|--------|-------|------|
| **ChatGPT Response Time** | 1-3s | ขึ้นอยู่กับความยาว |
| **DALL-E Response Time** | 10-20s | สร้างภาพใช้เวลา |
| **Server Response Time** | <100ms | ไม่รวม API |
| **Concurrent Users** | 100+ | ขึ้นอยู่กับ plan |

---

## 🚀 Future Improvements

### AI Enhancements
- [ ] เพิ่ม GPT-4 Vision สำหรับวิเคราะห์ภาพ
- [ ] เพิ่ม Whisper สำหรับ Voice Input
- [ ] เพิ่ม Text-to-Speech สำหรับ Voice Output
- [ ] เพิ่ม Fine-tuning สำหรับ Marketing Knowledge

### System Improvements
- [ ] เพิ่ม Caching สำหรับคำตอบทั่วไป
- [ ] เพิ่ม Analytics และ Logging
- [ ] เพิ่ม Multi-language Support
- [ ] เพิ่ม Advanced Search

---

## 📞 Support & Troubleshooting

### ปัญหา: ChatGPT ไม่ตอบ
**วิธีแก้:**
1. ตรวจสอบ API Key
2. ตรวจสอบ Credits
3. ดู logs

### ปัญหา: DALL-E ไม่สร้างภาพ
**วิธีแก้:**
1. ตรวจสอบ API Key
2. ลองใช้ placeholder
3. ดู logs

### ปัญหา: Server ช้า
**วิธีแก้:**
1. ตรวจสอบ Network
2. เพิ่ม Caching
3. ปรับ timeout

---

**สร้างโดย:** Manus AI  
**อัปเดตครั้งล่าสุด:** Oct 19, 2025  
**เวอร์ชัน:** 1.0

