import Header from "../organisms/navbar";
import SparePartDispalyCard from "../organisms/spare-part-display-card";


export default function SparePartsPage() {
  return (
    <div className="bg-gray-100">
      <div className="flex">
        {/* Left Ribbon - Filter Options */}
        <div className="w-1/6 bg-[#FFFFFF] p-4 shadow-md">
          <h2 className="font-semibold text-lg text-gray-800 mb-4">Filters</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <label>
                <input type="checkbox" className="mr-2" />
                Filter Option 1
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" />
                Filter Option 2
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" />
                Filter Option 3
              </label>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-4/5 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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