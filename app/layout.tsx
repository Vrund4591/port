import type { Metadata } from "next";
import { Bebas_Neue, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vrund Patel | Full Stack Developer",
  description:
    "Portfolio of Vrund Patel — IT student at LDRP-ITR, freelance full-stack developer, and hackathon finalist based in Gandhinagar, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
