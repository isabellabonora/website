import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isabella Bonora | UX & Product Designer",
  description: "I ask the questions nobody thought to ask.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
