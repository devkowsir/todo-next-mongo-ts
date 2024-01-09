import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TodoList",
  description: "Increase Productivity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"font-sans"}>{children}</body>
    </html>
  );
}
