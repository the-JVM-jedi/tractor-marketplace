import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { FeaturedTractors } from "@/components/organisms/featured-products";

export default async function HomePage() {
  const products = await fetch(`${process.env.URL}/api/featuredProducts`);
  const data = await products.json();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <Image
          src="/backgroundtractor.png"
          alt="Background Tractor"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-auto object-cover"
          height={1080}
          width={1920}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <p className="uppercase text-xs sm:text-sm tracking-widest text-white">
            Welcome to Hello Tractor
          </p>
          <h1 className="font-merriweather text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 text-white leading-tight">
            Find your Perfect<br className="hidden sm:inline" /> Tractor Today
          </h1>
          <Link href='/tractors' className="mt-4 sm:mt-6">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#FF461E] text-white font-medium text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
              Discover more
            </button>
          </Link>
        </div>
      </div>
      <Toaster />

      <div className="container mx-auto px-4 py-8">
        <FeaturedTractors products={data} />
      </div>
    </div>
  );
}

