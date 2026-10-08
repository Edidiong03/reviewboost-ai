import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { review } = await req.json();

  if (!review) {
    return NextResponse.json({ error: "No review" }, { status: 400 });
  }

  // For now fake AI — later we add OpenAI key
  const fakeReply = `Thank you so much for your feedback! We appreciate you saying: "${review.slice(0, 80)}...". We value you and hope to serve you again! - Management`;

  return NextResponse.json({ reply: fakeReply });
}
