import Link from 'next/link';

export default function Home() {
  return (
    <main style={{padding: '40px', fontFamily: 'sans-serif', textAlign: 'center'}}>
      <h1 style={{fontSize: '48px', fontWeight: 'bold'}}>ReviewBoost AI</h1>
      <p style={{fontSize: '20px', marginTop: '20px'}}>Turn your customer reviews into more sales with AI</p>
      <div style={{marginTop: '30px'}}>
        <Link href="/sign-up">
          <button style={{padding: '15px 30px', background: 'black', color: 'white', borderRadius: '10px', fontSize: '18px', cursor: 'pointer'}}>
            Get Started Free
          </button>
        </Link>
      </div>
      <p style={{marginTop: '40px', color: 'gray'}}>Real Next.js 14.2.5 - No Mock</p>
    </main>
  );
}

