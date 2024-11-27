import SparePartDispalyCard from "../components/organisms/spare-part-display-card";
import Image from "next/image";
export default function SparePart() {
    return (
        <div className="bg-white">
            <div className="flex items-start justify-center pt-30">
                <div className="w-100 flex justify-center">
                    <Image
                        src="sparepartImage.jpg"
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
                        <button className="mt-1 mr-10 px-6 py-1 h-[30px] bg-[#FF461E] text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                            Add to Wishlist
                        </button>
                        <button className="mt-1 px-6 py-1 h-[30px] bg-[#FF461E] text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                            Message Seller
                        </button>
                    </div>
                </div>

                {/* Seller Information - Align to top */}
                <div className="p-4 overflow-hidden flex flex-col items-start">
                    <h3 className="text-bold text-[#1F1E17]-800 text-lg font-bold">Seller Information:</h3>
                    <div className="flex items-start">
                        <Image
                            src="avatar.png"
                            alt="Seller Avatar"
                            className="w-20 h-20"
                            width={300}
                            height={300}
                        />
                        <div className="mt-5 ml-5">
                            <h3 className="text-sm text-gray-900 font-bold">Seller Score: 89%</h3>
                            <h3 className="text-sm text-gray-900 mt-1 font-bold">Seller Rating: 4.5</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-10 w-full max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4 text-gray-800">1 Review for Tomato</h3>
                <div className="flex items-start space-x-4">
                    <Image
                        src="avatar.png"
                        alt="Reviewer Image"
                        className="w-16 h-16 rounded-full border border-gray-300"
                        width={300}
                        height={300}
                    />
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                            <h5 className="text-sm font-semibold text-gray-700">Kevin Tomato</h5>
                            <h5 className="text-sm text-green-500">9th July 2022</h5>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            The tractor delivers exceptional power, handling even the toughest tasks with ease.
                            Whether it’s plowing through heavy soil or transporting loads, the engine runs
                            smoothly without stalling. The gear transitions are seamless, and the hydraulic
                            system is incredibly responsive, making operations feel effortless.
                        </p>
                    </div>
                </div>
            </div>

            <div className="items-center justify-center">
                <h3 className="text-black font-bold text-center mb-5">Other Products from Seller</h3>
                <div className="flex items-center justify-center">
                    <SparePartDispalyCard />
                    <SparePartDispalyCard />
                </div>
            </div>
        </div>
    );
}
