import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { review, tone = "professional" } = await req.json();
  if (!review) return NextResponse.json({ error: "No review" }, { status: 400 });

  const lower = review.toLowerCase();
   
  const isNegative = ["cold","bad","rude","slow","dirty","worst","terrible","disappointing"].some(w => lower.includes(w));

  let reply = "";

  if (tone === "friendly") {
    reply = isNegative 
      ? `Oh no, sorry about that! You mentioned "${snippet}..." - that's not cool. Thanks for telling us, we want to make your next visit way better! Come back soon? 😊`
      : `You made our day! Thanks for saying "${snippet}..." - we love to hear it! Can't wait to see you again! 🙌`;
  } else if (tone === "funny") {
    reply = isNegative
      ? `Ouch! "${snippet}..." - that's on us, not our finest moment! We'll put the microwave on standby and fix it. Give us a second chance? 😂`
      : `Haha YES! "${snippet}..." = you officially made the team do a happy dance! Come back for an encore? 😂`;
  } else if (tone === "apologetic") {
    reply = `We're sincerely sorry about "${snippet}...". Your experience is not the standard we aim for. Please contact us directly so we can make it right and ensure your next visit is 5-star. - The Management Team`;
  } else {
    // professional
    reply = isNegative
      ? `Thank you for your feedback regarding "${snippet}...". We apologize this did not meet your expectations and we appreciate you bringing it to our attention. We hope to serve you better next time. - Management`
      : `Thank you for your positive feedback on "${snippet}...". We appreciate your business and look forward to serving you again. - Management Team`;
  }

  return NextResponse.json({ reply });
}
