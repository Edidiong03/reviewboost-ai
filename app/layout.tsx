export const metadata = {
  title: "ReviewBoost AI",
  description: "Turn reviews into sales",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}
