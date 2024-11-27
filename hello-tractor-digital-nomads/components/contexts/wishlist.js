"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const WishlistContext = createContext(undefined)

export function WishlistProvider({ children }) {
  const { data: session } = useSession()
  const [wishlist, setWishlist] = useState([])

  // Load wishlist from localStorage when session changes
  useEffect(() => {
    if (session?.user?.email) {
      const savedWishlist = localStorage.getItem(`wishlist_${session.user.email}`)
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }
    }
  }, [session])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem(`wishlist_${session.user.email}`, JSON.stringify(wishlist))
    }
  }, [wishlist, session])

  const addToWishlist = (tractorId) => {
    setWishlist(prev => [...new Set([...prev, tractorId])])
  }

  const removeFromWishlist = (tractorId) => {
    setWishlist(prev => prev.filter(id => id !== tractorId))
  }

  const isInWishlist = (tractorId) => {
    return wishlist.includes(tractorId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

