import localFont from "next/font/local";
import { Manrope, Merriweather } from "next/font/google"


export const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
})

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight:["300"],
  variable: "--font-merriweather"
})

export const avenir = localFont({
  src: "/../public/fonts/avenir_ff/AvenirLTStd-Book.otf",
  variable: "--font-avenir",
  weight: "100 900",
});