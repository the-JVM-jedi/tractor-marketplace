import "./globals.css";

import { getServerSession } from "next-auth/next"

import Header from "@/components/organisms/navbar";
import SessionProvider from "@/components/session-provider";
import { WishlistProvider } from "@/components/contexts/wishlist";
import ChatBot from "@/components/organisms/chat-bot";

import { geistSans, geistMono, merriweather, manrope, avenir } from "../lib/fonts";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "HelloTractor",
  description: "This is the hellotractor e-commerce",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${manrope.variable} ${avenir.variable} antialiased reative`
        }
      >
        <SessionProvider session={session}>
          <WishlistProvider>
            <Header />
            {children}
            <ChatBot />
            <Toaster />
          </WishlistProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
