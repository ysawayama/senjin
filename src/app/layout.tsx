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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
