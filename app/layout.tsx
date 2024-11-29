import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Occasions",
  description: "Created and maintained by Appniche Technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
