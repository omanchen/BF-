import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLuckyFishName = async (): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "招財進寶 (API Key Missing)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Give me one creative, auspicious Chinese name for a pet goldfish (maximum 4 characters) and a very short reason (1 sentence) why it brings good luck for Black Friday shopping. Return in plain text.',
      config: {
        temperature: 0.9,
      }
    });

    return response.text || "金玉滿堂 - 財源滾滾來";
  } catch (error) {
    console.error("Error generating lucky name:", error);
    return "年年有餘 - 傳統好意頭";
  }
};

export const askFishExpert = async (question: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "請稍後再試 (API Key Missing)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful goldfish expert at a Black Friday sale. Answer the user's question about goldfish care briefly and enthusiastically in Traditional Chinese (Hong Kong Cantonese style). Question: ${question}`,
    });
    return response.text || "我們的金魚非常健康，歡迎選購！";
  } catch (error) {
    console.error("Error answering question:", error);
    return "系統繁忙，請稍後再試。";
  }
};
