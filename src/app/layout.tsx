import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenRoute — Travel lighter",
  description: "Compare the estimated climate impact of everyday journeys.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className=""
    >
      <body>{children}</body>
    </html>
  );
}
