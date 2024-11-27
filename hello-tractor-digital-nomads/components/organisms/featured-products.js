import TractorDisplayCard from "./tractor-display-card";
import SparePartDisplayCard from "./spare-part-display-card";

export function FeaturedTractors({ products }) {
  const { tractors, spareParts } = products;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="my-8 sm:my-12 md:my-16">
        <h2 className="font-manrope font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8 md:mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {tractors.map((tractor) => (
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
      </section>

      <section className="my-8 sm:my-12 md:my-16">
        <h2 className="font-manrope font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8 md:mb-10">
          Featured Spare Parts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {spareParts.map((sparePart) => (
            <SparePartDisplayCard
              key={sparePart.spare_part_id}
              id={sparePart.spare_part_id}
              brand_name={sparePart.brand_name}
              model={sparePart.model}
              price={sparePart.price}
              image_url={sparePart.image_url}
              quantity={sparePart.quantity}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

