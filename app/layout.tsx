import Providers from "@/app/components/Providers";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "./components/Header/Header";
import "./styles/globals.scss";
import "@splidejs/react-splide/css";
import Footer from "./components/Footer/Footer";
import { auth } from "@/auth";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Digital League",
  description:
    "La plateforme gaming de MyDigitalSchool Grenoble - Tournois, GameJams et communauté esports",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${interSans.variable}`}
        suppressHydrationWarning
      >
        <Providers>
          <Header session={session} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
