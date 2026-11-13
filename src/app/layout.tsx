import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taiwan Infra-Intelligence v8 | Spatial Topology & Scale",
  description: "Taiwan infrastructure point nodes, verified transport corridors, and architectural scale comparison."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="antialiased font-sans h-screen w-screen bg-slate-50 text-slate-700 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
