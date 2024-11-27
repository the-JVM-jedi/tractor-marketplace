'use client';

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";

import SparePartDisplayCard from "@/components/organisms/spare-part-display-card";
import Review from "@/components/organisms/review";

export default function SparePart() {
    const router = useRouter;
    const { id } = useParams;

    return (
        <div className="bg-white">
            {/* Add padding or margin to avoid overlap */}
            <div className="pt-10">
                <div className="pt-20">
                    <div className="flex items-start justify-center">
                        <div className="w-100 flex justify-center">
                            <Image
                                src="/sparepartImage.jpg"
                                alt="SparePart Image"
                                className="w-full h-60"
                                width={300}
                                height={300}
                            />
                        </div>
                        <div className="p-4 overflow-hidden w-[600px]">
                            <h3 className="text-bold text-[#1F1E17]-800 text-lg font-bold">Chias Diesel Cap</h3>
                            <div className="flex space-x-2 text-center text-sm mt-1">
                                <span className="text-red-500 font-bold">Price: $5.00</span>
                            </div>
                            <h3 className="text-bold text-black text-lg font-bold">Description</h3>
                            <p className="text-sm text-[#878680] break-words whitespace-normal">
                                Aliquam hendrerit a augue insuscipit. Etiam aliquam massa quis des mauris commodo venenatis ligula commodo leez sed blandit convallis dignissim onec vel pellentesque neque.
                            </p>

                            <h3 className="text-bold text-black text-lg font-bold mt-4">Specifications</h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {/* Specifications */}
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Make:</span> Chias
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Model:</span> 2023 Diesel Cap
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Condition:</span> Used
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Year:</span> 2022
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Location:</span> Nairobi
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Compatibility:</span> Compatible with XYZ Tractor Model
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Part Number:</span> CH-DC-2023
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Manufacturer:</span> Chias Industries
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Dimensions:</span> 12x15x20 cm
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Weight:</span> 2.5 kg
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Material:</span> Steel
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Warranty:</span> 6 months
                                </div>
                                <div className="text-sm text-[#878680]">
                                    <span className="font-semibold">Stock Availability:</span> In stock
                                </div>
                            </div>

                            <div className="flex justify-items-end mt-4">
                                <button className="mt-1 mr-10 px-6 py-1 h-[30px] bg-primary text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                                    Add to Wishlist
                                </button>
                                <button className="mt-1 px-6 py-1 h-[30px] bg-primary text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                                    Message Seller
                                </button>
                            </div>
                        </div>

                        {/* Seller Information - Align to top */}
                        <div className="p-4 overflow-hidden flex flex-col items-start justify-center">
                            <h3 className="text-bold text-[#1F1E17]-800 text-lg font-bold">Seller: Company Name</h3>
                            <div className="flex flex-col">
                                <div className="flex pt-5">
                                <Image
                                    src="/avatar.png"
                                    alt="Seller Avatar"
                                    className="w-20 h-20"
                                    width={100}
                                    height={100}
                                />
                                <div className="m-2 ml-5">
                                <div className="flex flex-row">
                                        <Image src="/HT_LOCATIONICON_ORANGE-05.png" alt="Location Icon" className="w-6 h-6" width="6" height="6" />
                                        <h3 className="text-sm text-gray-900 font-bold">Nairobi</h3> 
                                    </div>
                                    <div className="flex flex-row">
                                        <Image src="/star.png" alt="Rating Star" className="w-4 h-4 mt-2 mx-2" width="6" height="6" />
                                        <h3 className="text-sm text-gray-900 mt-1 font-bold">4.6 (336)</h3>
                                    </div>
                                </div>
                                </div>
                                <div className="mt-5 max-w-[200px] w-full">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                    This is the description of my company and store front, the details below are how you can contact me
                                    </p>
                                </div>
                                <div className="mt-5 w-full">
                                    <h3 className="text-sm text-gray-900 font-bold">Contacts</h3>
                                    <div className="flex flex-col">
                                        <h5 className="text-sm text-gray-600 font-bold">Email: example@gmail.com</h5>
                                        <h5 className="text-sm text-gray-600 font-bold">Phone: +254712345678</h5>
                                        <h5 className="text-sm text-gray-600 font-bold">www.website.link</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 w-full max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">1 Review for Tomato</h3>
                        <Review />
                        <Review />
                        <Review />
                    </div>

                    <div className="items-center justify-center">
                        <h3 className="text-black font-bold text-center mb-5">Other Products from Seller</h3>
                        <div className="flex items-center justify-center w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 pt-6 lg:pt-20 ml-auto lg:ml-1/5">
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />
                            <SparePartDisplayCard />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
