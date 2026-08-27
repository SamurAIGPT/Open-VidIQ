import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Open-VidIQ | Open Source Alternative to VidIQ & TubeBuddy",
  description:
    "Open-source YouTube SEO, keyword research, SERP rank tracking, video scorecards, transcript studio, and creator growth copilot — powered by MuAPI.",
  keywords: [
    "VidIQ alternative",
    "TubeBuddy alternative",
    "Open Source YouTube SEO",
    "YouTube SERP",
    "YouTube API",
    "MuAPI",
    "Creator tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080b11] text-neutral-100 antialiased selection:bg-red-500 selection:text-white">
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
          <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-neutral-800/80 bg-neutral-950/80 py-8 text-center text-xs text-neutral-500 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-300">Open-VidIQ</span>
                <span>•</span>
                <span>Open-source alternative to VidIQ</span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://muapi.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  Powered by MuAPI
                </a>
                <a
                  href="https://github.com/SamurAIGPT/Open-VidIQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
                <span className="text-neutral-600">MIT License</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
