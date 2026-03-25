export const captureEmail = async (email: string): Promise<void> => {
  const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('VITE_EMAIL_WEBHOOK_URL is not configured. Email not captured.');
    return;
  }
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: '5-minute-integrity-check',
      }),
    });
  } catch (err) {
    console.error('Email capture failed:', err);
  }
};
