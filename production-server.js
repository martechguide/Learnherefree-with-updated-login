import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.static('dist'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LearnHereFree server running' });
});

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 LearnHereFree Production Server running on port ${PORT}`);
  console.log(`🌐 Access at: http://learnherefree.online:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
});