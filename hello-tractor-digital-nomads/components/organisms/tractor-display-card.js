'use client'

import Image from "next/image";
import { useRouter } from "next/navigation"
import { Heart } from 'lucide-react'
import { useWishlist } from "@/components/contexts/wishlist"
import { useSession } from "next-auth/react"

export default function TractorDisplayCard({
    id,
    make = 'Farmatic Epc 5 Pro',
    model,
    price = '10000000',
    engine_power = 60,
    hours_used,
    fuel_type = 'Diesel',
    quantity = 10,
    image_url
}) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
    const { data: session } = useSession()
    const router = useRouter()

    const handleWishlistClick = () => {
        if (!session) {
            router.push('/sign-in')
            return
        }

        if (isInWishlist(id)) {
            removeFromWishlist(id)
        } else {
            addToWishlist(id)
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-48">
                <Image
                    src={"/TractorImage.png"}
                    alt={`${make} ${model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-t-lg"
                />
                <button
                    onClick={handleWishlistClick}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    aria-label={isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        className={`w-5 h-5 ${isInWishlist(id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                            }`}
                    />
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2 truncate hover:text-orange-500 transition-colors">
                    {make} {model}
                </h3>
                <div className="flex items-center space-x-4 text-sm mt-1">
                    <span className="text-gray-500 line-through">sh{price}</span>
                    <span className="text-orange-500 font-semibold text-lg">sh{price}</span>
                </div>
                <div className="flex flex-wrap items-center mt-4 gap-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/hpIcon.png"
                            alt="Horsepower"
                            width={24}
                            height={24}
                        />
                        <span className="font-medium">{engine_power}HP</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/gearsIcon.png"
                            alt="Drive Type"
                            width={24}
                            height={24}
                        />
                        <span className="font-medium">{fuel_type}</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-600 gap-2">
                    <span className={`px-2 py-1 rounded-full ${quantity === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {quantity === 0 ? "Out of Stock" : `${quantity} left`}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        Free Delivery
                    </span>
                </div>
            </div>
            <div className="p-4 bg-gray-50">
                <button 
                    onClick={() => router.push(`/tractors/${id}`)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

