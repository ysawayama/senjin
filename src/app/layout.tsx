import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "senjin - 先人から後輩へ、生のアドバイスを贈る",
  description: "人生の先輩から、今悩んでいるあなたへ。心に染み渡る、温かいアドバイスを。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
