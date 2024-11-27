'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function DealersPage() {
  const [filteredDealers, setFilteredDealers] = useState([
    {
      id: 1,
      name: "CMC (New Holland Dealer)",
      phone: "722283433",
      address: "Lusaka Rd, Nairobi",
      region: "Nairobi",
      dealer: "CMC",
    },
    {
      id: 2,
      name: "Mascor (John Deere)",
      phone: "254 207 602 298",
      address: "Uganda Rd, Eldoret",
      region: "Eldoret",
      dealer: "Mascor",
    },
    {
      id: 3,
      name: "FMD Marsay Furguson dealership",
      phone: "N/A",
      address: "Nairobi, Kenya",
      region: "Nairobi",
      dealer: "FMD",
    },
    // Add other dealers as necessary
  ]);

  // A mock function for filtering by region or dealer type
  const handleFilterChange = (filterType, value) => {
    const newFilteredDealers = [
      {
        id: 1,
        name: "CMC (New Holland Dealer)",
        phone: "722283433",
        address: "Lusaka Rd, Nairobi",
        region: "Nairobi",
        dealer: "CMC",
      },
      {
        id: 2,
        name: "Mascor (John Deere)",
        phone: "254 207 602 298",
        address: "Uganda Rd, Eldoret",
        region: "Eldoret",
        dealer: "Mascor",
      },
      {
        id: 3,
        name: "FMD Marsay Furguson dealership",
        phone: "N/A",
        address: "Nairobi, Kenya",
        region: "Nairobi",
        dealer: "FMD",
      },
    ].filter(dealer => dealer[filterType] === value);

    setFilteredDealers(newFilteredDealers);
  };

  return (
    <div className="w-full bg-[#FCFCFC] min-h-screen">
      {/* Header */}
      <div className="w-full h-17 px-6 flex items-center bg-[#FCFCFC] shadow-sm fixed top-0 z-10">
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center ml-10">
            <Image
              src="/HT_LOGO_RGB_Orange 1.png"
              alt="logo"
              className="w-36 h-auto"
              width={144}
              height={36}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 py-20">
        <h1 className="text-3xl font-semibold mb-8">Licensed Tractor Dealers</h1>

        {/* Filter Section */}
        <div className="flex space-x-6 mb-8">
          <div className="flex items-center">
            <label htmlFor="region" className="text-sm mr-2">Region:</label>
            <select
              id="region"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => handleFilterChange('region', e.target.value)}
            >
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              {/* Add other regions */}
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="dealer" className="text-sm mr-2">Dealer Type:</label>
            <select
              id="dealer"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => handleFilterChange('dealer', e.target.value)}
            >
              <option value="CMC">CMC (New Holland Dealer)</option>
              <option value="Mascor">Mascor (John Deere)</option>
              {/* Add other dealers */}
            </select>
          </div>
        </div>

        {/* Dealer List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <div key={dealer.id} className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="font-semibold text-lg">{dealer.name}</h2>
              <p className="text-sm text-gray-600">{dealer.phone}</p>
              <p className="text-sm text-gray-600">{dealer.address}</p>
              <Link href={`/dealers/${dealer.id}`} className="mt-5 px-2 py-1 h-[30px] bg-primary text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {/* Interactive Map (You will use a map component here, like Leaflet or Google Maps) */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Interactive Map of Dealers</h2>
          {/* You can use a library like Leaflet or Google Maps to embed a map here */}
        </div>
      </div>
    </div>
  );
}
