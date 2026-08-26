import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a helpful AI assistant for Shiloh Fresh Exporters, a premium Kenyan agricultural export company. 

About the company:
- We export fresh fruits (avocados, mangoes, passion fruits, pineapples), vegetables (French beans, carrots, snow peas, chili peppers), and herbs (basil, rosemary, mint, thyme, coriander, parsley)
- Our products are sourced from trusted Kenyan farmers in regions like Murang'a, Kiambu, Meru, Kirinyaga, and Nyeri
- We hold certifications including KEBS, HCDA, GlobalG.A.P., and Phytosanitary compliance
- Export grades: Class I and Class II for most products
- We offer cold chain logistics for both air and sea freight
- WhatsApp contact: +254 735 497 573
- Email: sarah@shilohfreshexporters.co.ke
- Buyers can request a formal quote on the website quote form with product, volume, destination market, and Incoterms

Your role:
- Answer questions about our products, pricing, availability, and export services
- Be friendly, professional, and concise
- If asked for specific prices, mention that prices vary by season, volume, and destination - recommend the Request Quote form or WhatsApp for an accurate quote
- For complex inquiries, direct users to the quote form, WhatsApp, or email sarah@shilohfreshexporters.co.ke
- Keep responses brief (2-3 sentences max) unless more detail is needed

Important: Always be helpful and guide users towards making inquiries or requesting quotes.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((msg: any) => ({ role: msg.role, content: msg.content })),
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "I apologize, but I couldn't process your request.";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
