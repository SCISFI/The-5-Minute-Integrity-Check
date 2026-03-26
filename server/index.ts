import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const PORT = parseInt(process.env.API_PORT || '3001');

app.use(cors({ origin: ['http://localhost:5000', 'https://localhost:5000'] }));
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
