import type { Metadata } from "next";
import "./globals.css";
import RegisterModal from "@/app/_components/modals/RegisterModal";
import LoginModal from "@/app/_components/modals/LoginModal";
import RentModal from "@/app/_components/modals/RentModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import Header from "@/app/_components/header/Header";
import Categories from "@/app/_components/Categories";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/_components/ClientOnly";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "Book Direct",
  description: "Short Term Rental Management Software",
    icons: "/logo.jpeg",
};

const font = Nunito({
    subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}){
    const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <ClientOnly>
          <Header currentUser={currentUser} />
          </ClientOnly>
      </ClientOnly>
      <Header />
      <Categories />
        {children}
      </body>
    </html>
  )
}
