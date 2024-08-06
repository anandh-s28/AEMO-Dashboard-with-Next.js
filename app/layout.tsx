import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AEMO Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-neutral-950">
        <ThemeProvider attribute="class" defaultTheme="system">
          <main className="min-h-screen flex flex-col text-white">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
