import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
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
        <body className={`${inter.className}`}>
          <Topbar />
          <main>
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
