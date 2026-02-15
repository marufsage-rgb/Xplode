
import { GoogleGenAI } from "@google/genai";

export async function getBusinessInsights(data: any) {
  try {
    // Safety check for browser environment without build tools
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : null;
    
    if (!apiKey) {
      console.warn("AI Service: No API Key found in environment variables.");
      return "AI analysis is currently unavailable (No API Key). Please check your dashboard metrics manually.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this ERP data and provide 3 concise business insights: ${JSON.stringify(data)}. 
      Focus on revenue trends, inventory alerts, and HR efficiency. Keep it professional and actionable.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Unable to generate insights at this moment. Please check your inventory levels and recent revenue trends manually.";
  }
}
