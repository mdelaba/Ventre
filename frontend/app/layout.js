"use client";
import localFont from "next/font/local"; // Import the localFont function
import "./globals.css"; // Assuming you have global styles
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

// Define local fonts with correct paths
const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/GeistVF.woff", // Path to your font file
      weight: "100 900", // Defining the weight range for the font
      style: "normal", // Font style, adjust if needed
    },
  ],
  variable: "--font-geist-sans", // Variable to use in your CSS
});

const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/GeistMonoVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="main-container">
          <Sidebar />
          <div className="content-container">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
