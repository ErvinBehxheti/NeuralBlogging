import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Header from "../components/NavigationBar/Header";
import ServiceWorkerWrapper from "../hooks/ServiceWorkerWrapper";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
  display: "swap",
});

const APP_NAME = "Neural Blogging";
const APP_DEFAULT_TITLE = "Neural Blogging";
const APP_TITLE_TEMPLATE = "Neural Blogging";
const APP_DESCRIPTION =
  "Neural Blogging: AI meets blogging in a PWA experience.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${inter.className} ${poppins.variable} relative`}>
        <ServiceWorkerWrapper />
        <Header />
        <main className="">{children}</main>
        <Image
          fill
          src={
            "http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://i.pinimg.com/736x/11/4f/1c/114f1c5a3898297a2b8cf79d413b7339.jpg"
          }
          alt="background-image"
          priority
          className="absolute top-0 left-0 bottom-0 h-full z-[-1] brightness-50 object-cover"
          sizes="100vw"
        />
        <Footer />
      </body>
    </html>
  );
}
