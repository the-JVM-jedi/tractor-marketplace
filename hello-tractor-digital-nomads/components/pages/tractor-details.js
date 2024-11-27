import Image from "next/image";
import TractorDisplayCard from "@/components/organisms/tractor-display-card";

export default function TractorDetailsPage({
    id,
    make = 'Farmatic Epc 5 Pro',
    model,
    price = '10000000',
    engine_power = 60,
    hours_used,
    fuel_type = 'Diesel',
    year_of_manufacturing,
    image_url,
    relatedTractors,
    location
}) {
    return (
        <>
          <div className="bg-white pt-16"> {/* Adjust padding-top to header height */}
            <div className="pt-20">
              <div className="flex items-start justify-center pt-30">
                <div className="w-100 items-left">
                  <Image
                    src="/TractorImage.png"
                    alt="Tractor Image"
                    className="w-full h-60"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-4 overflow-hidden w-[600px]">
                  <h3 className="text-bold text-[#1F1E17]-800 text-lg font-bold">{make}</h3>
                  <div className="flex space-x2 text-center text-sm mt-1">
                    <span className="text-primary font-bold">KSh {price}</span>
                  </div>
                  <h3 className="text-bold text-black text-lg font-bold">Description</h3>
                  <p className="text-sm text-[#878680] break-words whitespace-normal">
                    This is a really cool tractor
                  </p>
                  <h3 className="text-bold text-black text-lg font-bold">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm text-[#878680]">
                      <strong>Make:</strong> {make}
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Model:</strong> {model}
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Location:</strong> {location}
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Engine Type:</strong> {fuel_type}
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Horsepower:</strong> {engine_power} HP
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Transmission:</strong> Manual
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Fuel Type:</strong> Diesel
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Hours Used:</strong>{hours_used} hours
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Condition:</strong> Good Condition
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Year:</strong> {year_of_manufacturing}
                    </div>
                    <div className="text-sm text-[#878680]">
                      <strong>Warranty:</strong> 6 months
                    </div>
                  </div>
                </div>
                <div className="p-4 overflow-hidden flex flex-col items-start">
                  <h3 className="text-bold text-[#1F1E17]-800 text-lg font-bold">Seller: Tractors.Inc</h3>
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
                        <h5 className="text-sm text-gray-600 font-bold">www.tractorsinc.com</h5>
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
    
              <div className="items-center justify-center pb-20">
                <h3 className="text-black font-bold text-center mb-5">Other Products from Seller</h3>
                <div className="flex items-center justify-center w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-6 lg:pt-20 ml-auto lg:ml-1/5 z-index:0">
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                  <TractorDisplayCard />
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

