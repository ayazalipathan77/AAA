const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/gemini', async (req, res) => {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'Missing message' });
    if (!process.env.API_KEY) {
        console.error('API_KEY is not set');
        return res.status(500).json({ error: 'Server misconfigured: missing API key' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: message,
            config: { temperature: 0.7 }
        });

        return res.json({ text: response.text || '' });
    } catch (err) {
        console.error('Gemini proxy error:', err);
        return res.status(500).json({ error: 'AI request failed' });
    }
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, '..', 'dist')));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on ${port}`));
