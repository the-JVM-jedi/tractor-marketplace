"use client"

import React, { useState, useRef, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function UserAvatarMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogin = () => {
    signIn()
  }

  const handleLogout = () => {
    signOut()
  }

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {status === 'authenticated' ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 rounded-full bg-white p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Image
              src={session.user?.image || '/placeholder.svg?height=32&width=32'}
              alt={session.user?.name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{session.user?.name}</span>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-[#FF4820]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4820] focus:ring-offset-2"
        >
          Sign in
        </button>
      )}
    </div>
  )
}

