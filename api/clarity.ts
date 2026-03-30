import Groq from 'groq-sdk';

interface AssessmentData {
    patterns: boolean[];
    audit: Record<string, number>;
    pivot: { cost: string; risk: string; change: string };
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
          const { data } = req.body;
          if (!data) return res.status(400).json({ error: 'Missing data' });
          const memo = await generateClarity(data);
          return res.json({ memo });
    } catch (error) {
          console.error('Clarity error:', error);
          return res.status(500).json({ error: 'Failed to generate clarity memo' });
    }
}

async function generateClarity(data: AssessmentData): Promise<string> {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const yesCount = data.patterns.filter(Boolean).length;
    const auditValues = Object.values(data.audit) as number[];
    const lowAuditScores = (Object.entries(data.audit) as [string, number][])
      .filter(([_, val]) => val >= 0 && val <= 2)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()));

  const prompt = `Analyze the following results from "The 5-Minute Integrity Check" for a high-functioning professional:

  - Pattern Recognition: ${yesCount} out of 8 signs of private sexual coping detected.
  - Loneliness Audit: ${auditValues.map(v => v === -1 ? 'not rated' : v).join(', ')} (0-5 scale, 5 = strong connection).
  - Vulnerability Vectors: ${lowAuditScores.length > 0 ? lowAuditScores.join(', ') : 'None identified'}.
  - Pivot Reflection: Cost: "${data.pivot.cost}", Risk: "${data.pivot.risk}", Change: "${data.pivot.change}".

  Write a professional, executive-style clarity memo in one paragraph, under 150 words. Be direct and non-shaming. Focus on the connection between isolation and behavior. End with a structural call to action. Do not use headers, bullet points, or quotation marks around the memo.`;

  const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 250,
  });
    return completion.choices[0]?.message?.content?.trim() || '';
}
