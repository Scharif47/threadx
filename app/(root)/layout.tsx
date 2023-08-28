import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

// Metadata for Search Engine Optimization (SEO)
export const metadata = {
  title: "ThreadX",
  description:
    "ThreadX is a social media platform for developers to share their thoughts and ideas.",
};

// Get the Inter font
const inter = Inter({ subsets: ["latin"] });

// Layout for the entire app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
