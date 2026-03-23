import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ハイキタイ | 写真で選ぶ、わたしの歯医者さん",
  description:
    "Instagramの投稿から、医院の雰囲気がわかる歯科医院検索ポータル。近くの歯医者をビジュアルファーストで探せます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-ha-bg text-ha-text">
        {children}
      </body>
    </html>
  );
}
