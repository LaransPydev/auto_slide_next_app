import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sohne = localFont({
  src: [
    {
      path: "../public/fonts/fonts/sohne-kraftig.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/fonts/sohne-halbfett.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
});

export const metadata: Metadata = {
  title: "Sportstech sTread Pro",
  description: "Next Generation Home Fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sohne.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
