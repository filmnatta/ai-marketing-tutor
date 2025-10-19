import express from 'express';
import { middleware, Client } from '@line/bot-sdk';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// LINE Bot Configuration
const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const lineClient = new Client(lineConfig);

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(express.json());
// ใช้ LINE middleware เฉพาะ webhook endpoint เท่านั้น
app.use('/webhook', middleware(lineConfig));

// Store conversation history for context
const conversationHistory = new Map();

// Marketing knowledge base
const marketingKnowledge = {
  "4P": "4P ของการตลาด ประกอบด้วย Product (สินค้า) Price (ราคา) Place (สถานที่จำหน่าย) และ Promotion (การส่งเสริมการขาย)",
  "STP": "STP ย่อมาจาก Segmentation (การแบ่งส่วนตลาด) Targeting (การเลือกกลุ่มเป้าหมาย) และ Positioning (การกำหนดตำแหน่งสินค้า)",
  "SWOT": "SWOT คือการวิเคราะห์ Strengths (จุดแข็ง) Weaknesses (จุดอ่อน) Opportunities (โอกาส) และ Threats (อุปสรรค)",
  "Marketing Mix": "Marketing Mix ประกอบด้วย 4P หรือ 7P ที่ใช้ในการวางแผนการตลาด",
  "Brand": "Brand คือตัวตนของสินค้าหรือบริการที่สร้างความเชื่อมั่นและความจำในใจของผู้บริโภค",
  "Customer Journey": "Customer Journey คือเส้นทางการซื้อของลูกค้า ตั้งแต่การรู้จักสินค้า พิจารณา ตัดสินใจ และการซื้อซ้ำ"
};

/**
 * ตอบคำถามเกี่ยวกับการตลาดโดยใช้ ChatGPT
 */
async function getMarketingResponse(userMessage, userId) {
  try {
    // ดึงประวัติการสนทนา
    let history = conversationHistory.get(userId) || [];
    
    // เพิ่มข้อความของผู้ใช้เข้าไปในประวัติ
    history.push({
      role: 'user',
      content: userMessage
    });

    // สร้างระบบ prompt สำหรับการสอนการตลาด
    const systemPrompt = `คุณคือครูการตลาดที่มีความเชี่ยวชาญ มีหน้าที่ช่วยสอน ตอบคำถาม และให้ความรู้เกี่ยวกับการตลาด
    
กรุณา:
1. ตอบคำถามอย่างชัดเจนและเข้าใจง่าย
2. ใช้ตัวอย่างจริงเพื่อประกอบการอธิบาย
3. ให้คำแนะนำเชิงปฏิบัติที่สามารถนำไปใช้ได้
4. ถ้าผู้ใช้ขอให้สร้างสื่อภาพ (เช่น แผนภาพ 4P โพสเตอร์) ให้ตอบว่า "สามารถสร้างสื่อภาพได้ โปรดพิมพ์คำสั่ง: /generate-image [ชื่อสื่อ]"
5. พูดภาษาไทยเท่านั้น`;

    // เรียก ChatGPT API
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0].message.content;

    // เพิ่มคำตอบของ AI เข้าไปในประวัติ
    history.push({
      role: 'assistant',
      content: assistantMessage
    });

    // เก็บประวัติ (จำกัดไว้ 10 ข้อความล่าสุด)
    if (history.length > 20) {
      history = history.slice(-20);
    }
    conversationHistory.set(userId, history);

    return assistantMessage;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'ขออภัย เกิดข้อผิดพลาดในการประมวลผล โปรดลองใหม่อีกครั้ง';
  }
}

/**
 * สร้างสื่อภาพประกอบ
 */
async function generateMarketingImage(imageType) {
  try {
    const prompts = {
      '4P': 'Create a professional marketing diagram showing the 4P framework: Product, Price, Place, and Promotion. Use clear icons and Thai text labels.',
      'STP': 'Create a professional marketing diagram showing the STP framework: Segmentation, Targeting, and Positioning. Use clear icons and Thai text labels.',
      'SWOT': 'Create a professional SWOT analysis diagram with four quadrants showing Strengths, Weaknesses, Opportunities, and Threats. Use Thai text labels.',
      'Customer Journey': 'Create a customer journey map showing the stages: Awareness, Consideration, Decision, and Retention. Use icons and Thai text.',
      'Marketing Funnel': 'Create a marketing funnel diagram showing stages: Awareness, Interest, Consideration, Conversion, and Loyalty. Use Thai text labels.'
    };

    const prompt = prompts[imageType] || prompts['4P'];

    try {
      const image = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      });

      return image.data[0].url;
    } catch (error) {
      console.error('Error generating image:', error);
      // ถ้า DALL-E ไม่พร้อม ให้ใช้ placeholder
      return `https://via.placeholder.com/1024x1024?text=${encodeURIComponent(imageType)}+Diagram`;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

/**
 * จัดการข้อความจาก LINE
 */
app.post('/webhook', express.json(), middleware(lineConfig), async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      continue;
    }

    const userId = event.source.userId;
    const userMessage = event.message.text;

    try {
      let replyMessage;

      // ตรวจสอบคำสั่งพิเศษ
      if (userMessage.startsWith('/generate-image')) {
        const imageType = userMessage.replace('/generate-image', '').trim();
        replyMessage = `🎨 กำลังสร้างสื่อภาพ "${imageType}" โปรดรอสักครู่...`;
        
        await lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: replyMessage
        });

        const imageUrl = await generateMarketingImage(imageType);
        if (imageUrl) {
          await lineClient.pushMessage(userId, {
            type: 'image',
            originalContentUrl: imageUrl,
            previewImageUrl: imageUrl
          });
        }
      } else if (userMessage.startsWith('/help')) {
        replyMessage = `📚 คำสั่งที่มีอยู่:
• /help - แสดงคำสั่งทั้งหมด
• /generate-image [ชื่อสื่อ] - สร้างสื่อภาพ (4P, STP, SWOT, Customer Journey, Marketing Funnel)
• /reset - รีเซ็ตประวัติการสนทนา

💬 คุณสามารถถามคำถามเกี่ยวกับการตลาดได้เลย!`;
        
        await lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: replyMessage
        });
      } else if (userMessage.startsWith('/reset')) {
        conversationHistory.delete(userId);
        replyMessage = '✅ ประวัติการสนทนาได้รีเซ็ตแล้ว';
        
        await lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: replyMessage
        });
      } else {
        // ตอบคำถามเกี่ยวกับการตลาด
        replyMessage = await getMarketingResponse(userMessage, userId);
        
        await lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: replyMessage
        });
      }
    } catch (error) {
      console.error('Error handling message:', error);
      await lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: 'ขออภัย เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง'
      });
    }
  }

  res.json({ success: true });
});

/**
 * API endpoint สำหรับ chat ผ่านเว็บ
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // สร้าง user ID ชั่วคราวสำหรับ web chat
    const userId = 'web-user-' + Date.now();

    // ตรวจสอบคำสั่งพิเศษ
    if (message.startsWith('/generate-image')) {
      const imageType = message.replace('/generate-image', '').trim();
      const imageUrl = await generateMarketingImage(imageType);
      
      if (imageUrl) {
        return res.json({
          text: `🎨 สร้างสื่อภาพ "${imageType}" เสร็จแล้ว`,
          image: imageUrl
        });
      } else {
        return res.json({
          text: '❌ ไม่สามารถสร้างสื่อภาพได้ โปรดลองใหม่อีกครั้ง'
        });
      }
    } else if (message.startsWith('/help')) {
      return res.json({
        text: `📚 คำสั่งที่มีอยู่:
• /help - แสดงคำสั่งทั้งหมด
• /generate-image [ชื่อสื่อ] - สร้างสื่อภาพ (4P, STP, SWOT, Customer Journey, Marketing Funnel)
• /reset - รีเซ็ตประวัติการสนทนา

💬 คุณสามารถถามคำถามเกี่ยวกับการตลาดได้เลย!`
      });
    } else if (message.startsWith('/reset')) {
      conversationHistory.delete(userId);
      return res.json({
        text: '✅ ประวัติการสนทนาได้รีเซ็ตแล้ว'
      });
    } else {
      // ตอบคำถามเกี่ยวกับการตลาด
      const response = await getMarketingResponse(message, userId);
      return res.json({ text: response });
    }
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Marketing Tutor is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Marketing Tutor Server is running on port ${PORT}`);
  console.log(`🌐 Web Chat: http://localhost:${PORT}`);
  console.log(`📝 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

