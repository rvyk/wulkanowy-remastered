import AOSInitialize from "@/components/aos";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wulkanowy - Aplikacja ucznia i rodzica",
  description:
    "Nieoficjalna aplikacja mobilna ucznia i rodzica dla dziennika VULCAN UONET+",
  metadataBase: new URL("https://wulkanowy-remastered.vercel.app/"),
  openGraph: {
    title: "Wulkanowy - Aplikacja ucznia i rodzica",
    siteName: "Wulkanowy - Aplikacja ucznia i rodzica",
    description:
      "Nieoficjalna aplikacja mobilna ucznia i rodzica dla dziennika VULCAN UONET+",
    url: "https://wulkanowy-remastered.vercel.app/",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-img.png",
        width: 1200,
        height: 627,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wulkanowy - Aplikacja ucznia i rodzica",
    description:
      "Nieoficjalna aplikacja mobilna ucznia i rodzica dla dziennika VULCAN UONET+",
    images: [
      {
        url: "/og-img.png",
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={poppins.className}>{children}</body>
      <AOSInitialize />
    </html>
  );
}
