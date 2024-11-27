"use client"

import { useWishlist } from "@/components/contexts/wishlist"
import TractorDisplayCard from "@/components/organisms/tractor-display-card"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// This would typically come from your API
const mockTractors = {
    "1": {
        id: "1",
        make: "Farmatic Epc 5 Pro",
        price: "10000000",
        engine_power: 60,
        fuel_type: "Diesel",
        quantity: 10,
    },
    // Add more mock tractors as needed
}

export default function WishlistPage({ tractors }) {
    const { wishlist } = useWishlist()
    const { data: session, status } = useSession()
    const router = useRouter()

    console.log('This is the wishlist', wishlist)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-600">Loading...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-2xl text-gray-600 mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-8">Start adding tractors to your wishlist!</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full text-sm font-semibold transition duration-300"
                    >
                        Browse Tractors
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((tractorId) => (
                        <TractorDisplayCard
                            key={tractorId}
                            {...tractors[tractorId]}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

