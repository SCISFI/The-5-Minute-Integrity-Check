import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import routes from './routes.js';

const app = express();

// Replit Autoscale sets PORT. Local `npm run dev` is not production, so the
// API stays on API_PORT and Vite can keep port 5000.
const port = process.env.NODE_ENV === 'production'
  ? parseInt(process.env.PORT || '8080', 10)
  : parseInt(process.env.API_PORT || '3001', 10);

app.use(cors({ origin: ['http://localhost:5000', 'https://localhost:5000'] }));
app.use(express.json());
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        next();
        return;
      }
      if (req.path.startsWith('/api')) {
        next();
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'), (err) => {
        if (err) next();
      });
    });
  } else {
    console.warn(`Frontend build not found at ${distDir}. API routes are still available.`);
  }
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on ${port}`);
});
