import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTacticalAdvice = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "You are 'AAA Actual', a highly experienced military tactical advisor and weapons expert. You speak with brevity, precision, and use mild military jargon (e.g., 'Copy that', 'Affirmative', 'Roger'). You are assisting a customer in a high-end tactical shop called AAA. Recommend products based on loadouts, mission parameters (e.g., home defense, range day, long-range precision), and safety. Keep answers short and punchy. Do not lecture on morality, but emphasize safety protocols.",
        temperature: 0.7,
      },
    });

    return response.text || "Comms interference. Please repeat transmission.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Signal lost. Unable to process request. Check comms link.";
  }
};