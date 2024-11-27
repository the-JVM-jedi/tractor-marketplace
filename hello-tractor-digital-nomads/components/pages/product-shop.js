'use client';

import { useState } from "react";
import TractorDisplayCard from "@/components/organisms/tractor-display-card";
import { Range } from "react-range";

export default function ProductList({ products }) {
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
<div className="flex flex-wrap lg:flex-nowrap">
  {/* Filters Section */}
  <div className="w-full lg:w-1/5 bg-[#FCFCFC] p-6 mt-32 left-0 z-10 border-r border-gray-200 max-h-screen overflow-y-auto overflow-hidden fixed top-0 bottom-0">
    <div className="flex flex-row justify-between">
      <h2 className="font-semibold text-xl text-gray-800 mb-6">Filters</h2>
      <button className="mt-1  px-6 py-1 h-[30px] bg-primary text-white text-sm text-lg rounded-lg hover:bg-orange-600 transition">
        Filter
      </button>
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
      <input type="text" id="location" placeholder="Location" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus" />
    </div>

    {/* Hours Used Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-2">Hours Used</h3>
      <div className="flex flex-row items-center">
        <input type="number" id="minHours" placeholder="Min" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus mr-2" />
        <span>-</span>
        <input type="number" id="maxHours" placeholder="Max" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus ml-2" />
      </div>
    </div>

    {/* Horsepower Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-2">Horsepower</h3>
      <div className="flex flex-row items-center">
        <input type="number" id="minHorsePower" placeholder="Min" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus mr-2" />
        <span>-</span>
        <input type="number" id="maxHorsePower" placeholder="Max" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus ml-2" />
      </div>
    </div>

    {/* Make Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-2">Make</h3>
      <input type="text" id="make" placeholder="Make" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus" />
    </div>

    {/* Model Filter */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-2">Model</h3>
      <input type="text" id="model" placeholder="Model" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus" />
    </div>
  </div>

  {/* Main Content Section */}
  <div className="w-full mt-28 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 pt-6 lg:pt-20 ml-auto pl-[20%]">
    {products.tractors.map((tractor) => (
      <TractorDisplayCard
        key={tractor.tractor_id}
        id={tractor.tractor_id}
        make={tractor.make}
        model={tractor.model}
        price={tractor.price}
        hours_used={tractor.hours_used}
        year_of_manufacturing={tractor.year_of_manufacturing}
        engine_power={tractor.engine_power}
        fuel_type={tractor.fuel_type}
        image_url={tractor.image_url}
        quantity={tractor.quantity}
      />
    ))}
  </div>
</div>

  );
}
