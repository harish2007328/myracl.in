import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        role: "assistant",
        content: "⚠️ GROQ_API_KEY is not configured in your environment. Please create a `.env.local` file in the root of the project and add: \n`GROQ_API_KEY=your_groq_api_key_here`"
      });
    }

    const systemPrompt = `You are the official Customer Care AI Assistant of myracl. (always written as "myracl." with a trailing dot), a premium creative digital marketing and growth agency.
Your mission is to help visitors understand our agency, answer questions about our services and processes, and guide them to book a 15-minute call.

CONSTRAINTS:
1. ONLY answer questions based on the myracl. facts provided below. If a user asks something unrelated to myracl., our services, or marketing, politely refuse to answer and steer them back to our agency offerings. Do NOT answer general trivia, coding tasks, recipes, or math problems.
2. Keep responses brief, clear, and structured. Use bullet points or short bold headings where appropriate. Keep answers under 3-4 sentences whenever possible to maintain a conversational format.
3. Be professional yet punchy and modern (matching our Gen-Z/neo-brutalist vibe).
4. If the user wants to book a call, guide them to use our inline scheduler on the page, scroll to the bottom contact section, or click the "Book a Call Now" button.
5. If they ask for contact info, provide hello@myracl.in.

myracl. AGENCY FACTS:
- Brand Identity: myracl. is a creative digital marketing and growth agency.
- R.A.C.L. Framework:
  1. Reach: Paid media campaigns (Meta, Google, TikTok) & SEO.
  2. Authority: Positioning brands as leaders via content strategy.
  3. Content: Premium brand commercials, organic vertical video hooks (Reels, TikTok, Shorts).
  4. Leads: Highly-optimized Next.js landing pages & automated DM funnels.
- Services Offered:
  1. SEO (Search Engine Optimization): Technical SEO speed audits, keyword research, on-page content tuning, and site authority building to drive organic search traffic.
  2. Brand Strategy: Positioning, messaging, logo design, visual identity guidelines.
  3. Performance Ads: High-performing Facebook, Instagram, Google, and TikTok ad execution targeting maximum ROAS (typically aiming for 4x ROAS).
  4. Video Production: Commercial shoots, scriptwriting, lighting, sound, and platform-optimized social hooks.
  5. Website Making: Coded in Next.js/React with Tailwind CSS. Super-fast load times, interactive animations, and responsive layouts.
  6. Social Growth: Content calendars, custom graphic carousels, engagement automation (ManyChat), and audience scaling.
- Agency Philosophy & History:
  - Founded recently in 2026, operating with under 2 months of execution experience.
  - myracl. is not just a marketing agency—we are a growth partner. We refine each and every single detail to boost the brand partnered with us.
- Business Model & Pricing:
  - Custom retainer + performance revenue share. We only win when you scale.
  - Typical ROI visible in 30-45 days.
- Target Audience: Funded or cash-flow positive startups, D2C brands, and fast-growing tech companies.
- Locations: Worldwide operations based out of India.`;

    const groqPayload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.3,
      max_tokens: 500,
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error details:", errorData);
      return NextResponse.json({
        role: "assistant",
        content: `🔴 Groq API error (${response.status}): ${errorData?.error?.message || "Failed to communicate with Groq. Please verify your API Key."}`
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    return NextResponse.json(assistantMessage || {
      role: "assistant",
      content: "Sorry, I couldn't process your message. Please try again."
    });
  } catch (error: any) {
    console.error("Error in chat route:", error);
    return NextResponse.json({
      role: "assistant",
      content: "🔴 Server error while processing chat: " + (error?.message || "Unknown error")
    }, { status: 500 });
  }
}
