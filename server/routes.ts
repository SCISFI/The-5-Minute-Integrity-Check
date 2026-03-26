import { Router, Request, Response } from 'express';
import { sendResultsEmail } from './email.js';
import { generateClarity } from './clarity.js';

const router = Router();

router.post('/clarity', async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!data) { res.status(400).json({ error: 'Missing data' }); return; }
    const memo = await generateClarity(data);
    res.json({ memo });
  } catch (error) {
    console.error('Clarity error:', error);
    res.status(500).json({ error: 'Failed to generate clarity memo' });
  }
});

router.post('/send-email', async (req: Request, res: Response) => {
  try {
    const { email, firstName, data, clarityMemo } = req.body;
    if (!email || !data) { res.status(400).json({ error: 'Missing required fields' }); return; }
    await sendResultsEmail(email, firstName || 'there', data, clarityMemo || '');
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
