"use client";
import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("professional");
  const [used, setUsed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("rb_used") || "0");
    setUsed(saved);
    if (saved >= 2) setShowPaywall(true);
  }, []);

  async function handleGenerate() {
    const currentUsed = parseInt(localStorage.getItem("rb_used") || "0");
    if (currentUsed >= 2) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/generate-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review, tone }),
    });
    const data = await res.json();
    setReply(data.reply);
    setInsight(data.insight || "");
    const newUsed = currentUsed + 1;
    localStorage.setItem("rb_used", String(newUsed));
    setUsed(newUsed);
    if (newUsed >= 2) setShowPaywall(true);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 650, margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>ReviewBoost AI 🚀</h1>
        <UserButton />
      </div>

      <p style={{ marginTop: 10, color: "#666" }}>Paste any customer review, get instant reply + sales idea • {used}/2 free used</p>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="e.g. Food was cold and service was slow..."
        style={{ width: "100%", height: 100, marginTop: 20, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {(["professional", "friendly", "apologetic", "funny"] as const).map((t) => (
          <button key={t} onClick={() => setTone(t)} type="button" style={{ padding: "6px 12px", borderRadius: "20px", border: "1px solid #ccc", background: tone === t ? "#000" : "#fff", color: tone === t ? "#fff" : "#000" }}>
            {t}
          </button>
        ))}
      </div>

      {!showPaywall ? (
        <button
          onClick={handleGenerate}
          disabled={loading || !review}
          style={{ width: "100%", marginTop: 10, padding: 12, background: loading ? "#999" : "#000", color: "#fff", borderRadius: 8, border: "none", fontWeight: "bold" }}
        >
          {loading ? "Generating..." : "Generate Reply ✨"}
        </button>
      ) : null}

      {reply && !showPaywall && (
        <div style={{ marginTop: 20, padding: 15, background: "#f5f5f5", borderRadius: 8, border: "1px solid #ddd" }}>
          <strong>AI Reply:</strong>
          <p style={{ marginTop: 8 }}>{reply}</p>
        </div>
      )}

      {insight && !showPaywall && (
        <div style={{ marginTop: 15, padding: 15, background: "#fffbeb", borderRadius: 8, border: "1px solid #fcd34d" }}>
          <strong>💰 Sales Insight:</strong>
          <p style={{ marginTop: 8, fontSize: 14 }}>{insight}</p>
        </div>
      )}

      {showPaywall && (
        <div style={{ marginTop: 25, padding: 25, background: "#000", color: "#fff", borderRadius: 16, textAlign: "center" }}>
          <h2 style={{ fontSize: 22 }}>🔒 You’ve used your 2 free credits</h2>
          <p style={{ marginTop: 10, color: "#aaa" }}>Businesses pay $29/mo to turn 1-star reviews into sales. Unlock unlimited.</p>
          <a
            href="https://YOUR_LEMONSQUEEZY_LINK_HERE"
            target="_blank"
            style={{ display: "block", marginTop: 18, padding: 14, background: "#fff", color: "#000", borderRadius: 10, fontWeight: "bold", textDecoration: "none" }}
          >
            Upgrade to Pro — $29/mo 🚀
          </a>
          <p style={{ marginTop: 12, fontSize: 12, color: "#666" }}>✓ Unlimited replies ✓ 4 tones ✓ Sales Insights ✓ Cancel anytime</p>
          <button onClick={() => { localStorage.setItem("rb_used","0"); setUsed(0); setShowPaywall(false); setReply(""); setInsight(""); }} style={{marginTop:15, background:"transparent", color:"#666", border:"none", textDecoration:"underline", fontSize:12}}>Reset for testing</button>
        </div>
      )}
    </div>
  );
}
