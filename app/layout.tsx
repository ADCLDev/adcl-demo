import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
// Your global CSS file
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

export const metadata: Metadata = {
  metadataBase: new URL('https://archdcl.com'),
  title: 'ArchDCL - Archtecture Firm',
  description: 'A Architecture Firm in Bangladesh',
  keywords: ['architecture', 'design', 'add relevant keywords'],
  openGraph: {
    title: 'ArchDCL',
    description: 'A Architecture Firm in Bangladesh',
    url: 'https://archdcl.com',
    siteName: 'ArchDCL',
    images: [
      {
        url: 'https://www.archdcl.com/Arch%20logo%202.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}