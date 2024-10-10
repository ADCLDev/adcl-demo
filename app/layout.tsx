import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
// Your global CSS file
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

export const metadata: Metadata = {
  title: {
    default: "ARCHDCL | Leading Architectural Firm in Bangladesh",
    template: "%s | ARCHDCL - Bangladesh Architecture",
  },
  description: "ARCHDCL is a premier architectural firm in Bangladesh, offering innovative design solutions for residential and commercial projects.",
  openGraph: {
    title: "ARCHDCL | Top Architectural Firm in Bangladesh",
    description:
      "Discover ARCHDCL, Bangladesh's leading architectural firm. Innovative designs for residential, commercial, and urban projects.",
    url: "https://archdcl.com",
    siteName: "ARCHDCL - Bangladesh Architecture",
    images: [
      {
        url: "https://archdcl.com/",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-BD",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "ARCHDCL - Leading Architectural Firm in Bangladesh",
    card: "summary_large_image",
  },
  icons: {
    icon: "/faviconadcl.ico",
    shortcut: "/faviconadcl.ico",
    apple: "/faviconadcl.ico",
  },
  keywords: "architecture, Bangladesh, ARCHDCL, architectural firm, design, Dhaka, residential, commercial, urban planning",
};

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