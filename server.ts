import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleAnalystChat, handleExecutiveSynthesis } from './server/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Endpoints for Gemini AI
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message parameter is required.' });
    }
    const result = await handleAnalystChat(message, history || []);
    return res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/chat:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

app.post('/api/gemini/synthesize', async (req, res) => {
  try {
    const { documentSelection } = req.body;
    const result = await handleExecutiveSynthesis(documentSelection || 'both');
    return res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/synthesize:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ARCTIC-INTEL Server running on port ${PORT}`);
});
