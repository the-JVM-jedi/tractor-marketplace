'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";

export default function Tractor() {
    const router = useRouter();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);

    // Tractor details (use actual data from your API or database here)
    const [formData, setFormData] = useState({
        title: "Farmatic Epc 5 Pro",
        price: "5.00",
        description: "Aliquam hendrerit a augue insuscipit. Etiam aliquam massa quis des mauris commodo venenatis ligula commodo leez sed blandit convallis dignissim onec vel pellentesque neque.",
        make: "Farmatic",
        model: "Epc 5 Pro",
        location: "Nairobi",
        engineType: "Diesel",
        horsepower: "80 HP",
        transmission: "Manual",
        fuelType: "Diesel",
        hoursUsed: "6000 hours",
        condition: "Good Condition",
        purchaseYear: "2015",
        warranty: "6 months",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Handle saving the form data (could be an API call)
        setIsEditing(false);
        console.log("Saved Data:", formData);
    };

    return (
        <div className="bg-white">
            <Header />
            <div className="pt-10">
                <div className="pt-20">
                    <div className="flex items-center justify-center pt-30">
                        <div className="w-100 items-left">
                            <img src="../TractorImage.png" alt="Tractor Image" className="w-full h-60" />
                        </div>
                        <div className="p-4 overflow-hidden w-[600px]">
                            <h3 className="text-bold text-[#1F1E17]-800 text-lg font-bold">{formData.title}</h3>
                            <div className="flex space-x2 text-center text-sm mt-1">
                                <span className="text-red-500 font-bold">Price: ${formData.price}</span>
                            </div>
                            <h3 className="text-bold text-black text-lg font-bold">Description</h3>
                            <p className="text-sm text-[#878680] break-words whitespace-normal">
                                {formData.description}
                            </p>
                            <h3 className="text-bold text-black text-lg font-bold">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(formData).map(([key, value]) => {
                                    if (key !== "title" && key !== "price" && key !== "description") {
                                        return (
                                            <div key={key} className="text-sm text-[#878680]">
                                                <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong> 
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name={key}
                                                        value={value}
                                                        onChange={handleChange}
                                                        className="text-sm text-[#878680] border border-gray-300 rounded-md p-1"
                                                    />
                                                ) : (
                                                    value
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className="w-100 items-center">
                            <div className="flex flex-col">
                                <div className="flex justify-items: end flex-col">
                                    <h3 className="text-lg text-md text-black font-bold text-top">Manage Listing</h3>
                                    <button className="mt-2 mt-1 px-6 py-1 h-[30px] bg-[#FF461E] text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                                        Sold!
                                    </button>
                                    <button 
                                        className="mt-2 mt-1 px-6 py-1 h-[30px] bg-[#FF461E] text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? "Save" : "Edit"}
                                    </button>
                                    <button className="mt-2 mt-1 px-6 py-1 h-[30px] bg-[#FF461E] text-white text-sm text-lg rounded-lg shadow-md hover:bg-orange-600 transition">
                                        Delete
                                    </button>
                                </div>
                                <div className="flex justify-items: end flex-col">
                                    <h3 className="text-lg text-md text-black font-bold text-top">Analytics</h3>
                                    <div className="text-sm text-[#878680]">
                                        <strong>Views:</strong> 32,000
                                    </div>
                                    <div className="text-sm text-[#878680]">
                                        <strong>Enquiries:</strong> 1,289
                                    </div>
                                    <div className="text-sm text-[#878680]">
                                        <strong>Sales:</strong> 57
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
