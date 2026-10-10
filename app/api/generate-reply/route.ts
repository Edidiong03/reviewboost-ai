import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { review, tone = "professional" } = await req.json();
  if (!review) return NextResponse.json({ error: "No review" }, { status: 400 });

  const lower = review.toLowerCase();
  const isNegative = ["cold","bad","rude","slow","dirty","worst","terrible","disappointing"].some(w => lower.includes(w));
  const snippet = review.slice(0,60);
  let reply = "";

  if (tone === "friendly") {
    reply = isNegative 
      ? `Oh no, sorry about that! You mentioned "${snippet}..." - that's not cool. Thanks for telling us, we want to make your next visit way better!`
      : `You made our day! Thanks for saying "${snippet}..." - we love to hear it! Can't wait to see you again!`;
  } else if (tone === "funny") {
    reply = isNegative
      ? `Ouch! "${snippet}..." - that's on us, not our finest moment! We'll put the microwave on standby and fix it. Give us a second chance?`
      : `Haha YES! "${snippet}..." = you officially made the team do a happy dance! Come back for an encore?`;
  } else if (tone === "apologetic") {
    reply = `We're sincerely sorry about "${snippet}...". Your experience is not the standard we aim for. Please contact us so we can make it right.`;
  } else {
    reply = isNegative
      ? `Thank you for your feedback regarding "${snippet}...". We apologize this did not meet your expectations and appreciate you bringing it to our attention.`
      : `Thank you for your positive feedback on "${snippet}...". We appreciate your business and look forward to serving you again.`;
  }

  return NextResponse.json({ reply });
}
