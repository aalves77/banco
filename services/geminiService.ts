
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialAdvice = async (
  query: string,
  transactions: Transaction[],
  userName: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `Você é o assistente financeiro pessoal de elite do Santander Premium. 
  Seu nome é S-IA. Você deve ser profissional, prestativo e educado.
  Analise os dados das transações do usuário e responda perguntas sobre gastos, economia e investimentos.
  Mantenha as respostas concisas e úteis para um aplicativo mobile.
  Dados do Usuário: ${userName}.
  Transações recentes: ${JSON.stringify(transactions)}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, não consegui processar sua solicitação agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar minha base de conhecimento.";
  }
};
