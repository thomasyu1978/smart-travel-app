const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json()); // 用来解析前端发来的JSON数据

// 从环境变量中读取API密钥，而不是硬编码
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// 创建一个新的API端点，让前端来调用
app.post('/api/gemini-vision', async (req, res) => {
  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  try {
    const geminiUrl = `https://generativelace.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GOOGLE_API_KEY}`;

    // 将前端发来的请求体转发给Google
    const response = await axios.post(geminiUrl, req.body);

    // 将Google的响应再发回给前端
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    res.status(500).json({ error: 'Failed to call Gemini API.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));