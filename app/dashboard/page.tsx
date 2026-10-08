"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch("/api/generate-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div style={{padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: 'auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{fontSize: 24, fontWeight: 'bold'}}>ReviewBoost AI 🤖</h1>
        <UserButton />
      </div>

      <p style={{marginTop: 10, color: '#666'}}>Paste any customer review, get instant reply!</p>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="e.g. Food was cold and service was slow..."
        style={{width: '100%', height: 100, marginTop: 20, padding: 10, border: '1px solid #ccc', borderRadius: 8}}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !review}
        style={{width: '100%', marginTop: 10, padding: 12, background: loading ? '#999' : '#000', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold'}}
      >
        {loading ? "Generating..." : "Generate Reply ✨"}
      </button>

      {reply && (
        <div style={{marginTop: 20, padding: 15, background: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd'}}>
          <strong>AI Reply:</strong>
          <p style={{marginTop: 10}}>{reply}</p>
          <button onClick={() => navigator.clipboard.writeText(reply)} style={{marginTop: 10, padding: 8, fontSize: 12}}>Copy 📋</button>
        </div>
      )}
    </div>
  );
}
