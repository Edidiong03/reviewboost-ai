import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { review } = await req.json();

  if (!review) {
    return NextResponse.json({ error: "No review" }, { status: 400 });
  }

  const lower = review.toLowerCase();
  const isNegative = lower.includes("bad") || lower.includes("slow") || lower.includes("cold") || lower.includes("rude") || lower.includes("poor") || lower.includes("worst") || lower.includes("terrible");
  const isPositive = lower.includes("great") || lower.includes("amazing") || lower.includes("love") || lower.includes("best") || lower.includes("excellent") || lower.includes("wonderful");

  let reply = "";

  if (isNegative) {
    reply = `Thank you so much for taking the time to share your feedback. We're truly sorry to hear about your experience with "${review.slice(0, 80)}..." - that's not the standard we aim for.

We'd love to make it right. Please reach out to us directly so we can learn more and ensure your next visit is 5-star.

- The Management Team`;
  } else if (isPositive) {
    reply = `Wow, thank you for the amazing review! We're thrilled you enjoyed "${review.slice(0, 80)}...".

Your kind words mean the world to our team and keep us motivated. We can't wait to welcome you back again soon!

- The Team ❤️`;
  } else {
    reply = `Thank you for your thoughtful feedback! We really appreciate you mentioning "${review.slice(0, 60)}...".

Feedback like yours helps us grow and serve you better. Hope to see you again soon!

- Management`;
  }

  return NextResponse.json({ reply });
}
