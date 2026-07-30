import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Content Polish Endpoint (Bio & Project Summaries)
  app.post("/api/ai-enhance", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "Gemini API key is missing. Please add it in AI Studio Secrets." });
      }

      const { prompt, type } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      let systemInstruction = "You are an expert tech recruiter and portfolio copywriter. Polish the text into professional, impactful, engaging developer copy. Keep tone concise and executive.";
      if (type === "bio") {
        systemInstruction = "You are a top tech career consultant. Rewrite the bio into a compelling 2-3 sentence executive developer summary highlighting technical breadth, impact, and passion.";
      } else if (type === "project") {
        systemInstruction = "You are an engineering leader. Formulate 3 quantitative bullet points summarizing engineering impact, architecture, and performance metric highlights for this project.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Enhance Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI response" });
    }
  });

  // AI Recruiter Assistant Chat Endpoint ("Ask AI about me")
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "Gemini API key is not configured." });
      }

      const { message, profileData, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = new GoogleGenAI({ apiKey });

      const profileSummary = JSON.stringify(profileData || {}, null, 2);
      const systemInstruction = `You are the personal AI Career Assistant for ${profileData?.name || "this engineer"}.
You answer questions from recruiters, hiring managers, and prospective clients visiting this portfolio.
Use the candidate's profile context provided below:
---
${profileSummary}
---
Guidelines:
- Answer accurately based on their experience, projects, skills, availability, and background.
- Be polite, enthusiastic, professional, and concise (2-4 sentences max per reply).
- Highlight key projects or skills relevant to the user's inquiry.
- If asked about hiring or contacting, point them to the contact form or social links.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: error.message || "AI Assistant failed to reply" });
    }
  });

  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
