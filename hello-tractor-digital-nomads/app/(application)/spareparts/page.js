'use client';

import { useState } from "react";
import Header from "../../../components/organisms/navbar";
import SparePartDispalyCard from "../../../components/organisms/spare-part-display-card";
import { Range } from "react-range";

export default function SparePartsPage() {
  const [priceRange, setPriceRange] = useState([10000, 50000]); // [min, max]
  const [hoursUsedRange, setHoursUsedRange] = useState([1000, 5000]); // [min, max]

  // Handle range change for price
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  // Handle range change for hours used
  const handleHoursUsedChange = (values) => {
    setHoursUsedRange(values);
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Main Content Section */}
      <div className="w-full lg:w-1/5 bg-[#FCFCFC] p-6 mt-32 left-0 z-10 border-r border-gray-200 max-h-screen overflow-y-auto overflow-hidden fixed top-0 bottom-0">
          <div className="flex flex-row justify-between">
            <h2 className="font-semibold text-xl text-gray-800 mb-6">Filters</h2>
            <button className="mt-1  px-6 py-1 h-[30px] bg-primary text-white text-sm text-lg rounded-lg hover:bg-orange-600 transition">
              Filter
            </button>
          </div>
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Make</h3>
            <div className="items-left">
              <input type="text" id="make" placeholder="Make" className=" w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus ml-2" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Model</h3>
            <div className="items-left">
              <input type="text" id="model" placeholder="Model" className=" w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus ml-2" />
            </div>
          </div>
{/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Price</h3>
            <div className="flex flex-row items-center">
              <input type="number" id="minPrice" placeholder="Min" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus mr-2" />
              <span>-</span>
              <input type="number" id="maxPrice" placeholder="Max" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus ml-2" />
            </div>
          </div>

{/* Location Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Location</h3>
            <div className="items-left">
              <input type="text" id="location" placeholder="Location" className=" w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus ml-2" />
            </div>
          </div>
        </div>
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Left Ribbon - Filter Options */}


        {/* Main Content Area */}
        <div className="w-full lg:w-4/5 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 lg:pt-20 ml-auto lg:ml-1/5">
          <SparePartDispalyCard />
          <SparePartDispalyCard />
          <SparePartDispalyCard />
          <SparePartDispalyCard />
          <SparePartDispalyCard />
          <SparePartDispalyCard />
          <SparePartDispalyCard />
        </div>
      </div>
    </div>
  );
}
