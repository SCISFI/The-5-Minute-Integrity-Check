
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentData } from "../types";

// Always use process.env.API_KEY directly and use a named parameter object.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getClarityInsight = async (data: AssessmentData) => {
  // Cast Object.values to number[] to resolve 'unknown' comparison issues.
  const auditValues = Object.values(data.audit) as number[];
  const yesCount = data.patterns.filter(p => p).length;
  // Cast Object.entries to [string, number][] to resolve 'unknown' comparison issues.
  const lowAuditScores = (Object.entries(data.audit) as [string, number][])
    .filter(([_, val]) => val <= 2)
    .map(([key, _]) => key);

  const prompt = `
    Analyze the following results from "The 5-Minute Integrity Check" for a high-functioning professional:
    
    - Pattern Recognition: ${yesCount} out of 8 signs of private sexual coping detected.
    - Loneliness Audit: ${auditValues.join(', ')} (0-5 scale).
    - Vulnerability Vectors: ${lowAuditScores.length > 0 ? lowAuditScores.join(', ') : 'None identified'}.
    - Pivot Reflection: Cost: "${data.pivot.cost}", Change: "${data.pivot.change}".

    Provide a professional, executive-style clarity memo. 
    Use a tone that is direct, non-shaming, and focused on "structure over motivation".
    Keep it under 150 words. Focus on the connection between isolation and behavior.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    // Access response.text directly (property access, not method call).
    return response.text;
  } catch (error) {
    console.error("Error generating insight:", error);
    return "Error generating professional insight. Please focus on your audit results below.";
  }
};
