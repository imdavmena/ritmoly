import { OPENAI_API_KEY } from "$env/static/private";

export class OpenAIClient {
  private apiKey = OPENAI_API_KEY!;

  async chatJson(prompt: string) {
    if (!this.apiKey) throw new Error("Missing OPENAI_API_KEY");

    // Real call (sin SDK) para mantener dependencias mínimas
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a helpful music curation engine that outputs strict JSON." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`OpenAI error: ${res.status} ${txt}`);
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content from OpenAI");
    return JSON.parse(content);
  }
}
