'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, X, Search } from 'lucide-react'
import { links } from "@/lib/links";
import UserAvatarMenu from "./user-avatar-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="w-full bg-[#FCFCFC] shadow-sm">
      {/* Header Section */}
      <div className="w-full h-16 px-4 sm:px-6 flex items-center">
        <div className="w-full flex items-center justify-between">
          {/* Left Section - Logo and Mobile Menu */}
          <div className="flex items-center">
            <button
              className="mr-2 sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <Image
              src="/HT_LOGO_RGB_Orange 1.png"
              alt="logo"
              className="w-24 sm:w-36 h-auto"
              width={144}
              height={36}
            />
          </div>

          {/* Center Section - Search (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6 text-gray-600 text-sm">
            <form className="flex items-center">
              <input
                type="text"
                placeholder="Search for tractor or Spare Part"
                className="w-64 lg:w-96 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            <button 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>
            <button className="hidden sm:block bg-primary px-4 sm:px-6 py-2 text-sm font-medium hover:bg-orange-600 text-white font-semibold rounded-lg">
              Sell
            </button>
            <Link
              href="/wishlist"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Go to wishlist</span>
              <Heart className="h-6 w-6" />
            </Link>
            <UserAvatarMenu />
          </div>
        </div>
      </div>

      {/* Mobile Search (Visible when search is open) */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-white">
          <form className="flex items-center">
            <input
              type="text"
              placeholder="Search for tractor or Spare Part"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-orange-600 transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Navbar Section (Hidden on mobile when menu is closed) */}
      <div className={`bg-[#FCFCFC] shadow-sm ${isMenuOpen ? 'block' : 'hidden sm:block'}`}>
        <nav className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row text-sm font-medium w-full sm:w-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 px-2 sm:px-10 py-2 hover:bg-gray-200 font-manrope font-semibold transition-colors duration-300 w-full sm:w-auto text-left"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

