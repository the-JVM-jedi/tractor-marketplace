import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'

// Handler for GET requests
export async function GET(request, { params }) {
  const { id } = params; // Extract tractor ID from URL params

  try {
    // Fetch details of the specific tractor
    const sparePartResponse = await fetch(`${DIRECTUS_URL}/items/spare_part/${id}`);

    if (!sparePartResponse.ok) {
      throw new Error(`Failed to fetch tractor: ${sparePartResponse.statusText}`);
    }

    const spare_part = await sparePartResponse.json();

    // Fetch related tractors from the same seller
    const relatedTractorsResponse = await fetch(
      `${DIRECTUS_URL}/items/tractor?filter[seller_id][_eq]=${spare_part.data.seller_id}`);

    if (!relatedTractorsResponse.ok) {
      throw new Error(`Failed to fetch related tractors: ${relatedTractorsResponse.statusText}`);
    }

    const relatedTractors = await relatedTractorsResponse.json();

    // Fetch related spare parts from the same seller
    const relatedSparePartsResponse = await fetch(
      `${DIRECTUS_URL}/items/spare_part?filter[seller_id][_eq]=${spare_part.data.seller_id}&filter[spare_part_id][_neq]=${id}`);

    if (!relatedSparePartsResponse.ok) {
      throw new Error(`Failed to fetch related spare parts: ${relatedSparePartsResponse.statusText}`);
    }

    const relatedSpareParts = await relatedSparePartsResponse.json();

    // Fetch reviews associated with the tractor
    const reviewsResponse = await fetch(
      `${DIRECTUS_URL}/items/review?filter[entity_type][_eq]=spare_part&filter[entity_id][_eq]=${id}`);

    if (!reviewsResponse.ok) {
      throw new Error(`Failed to fetch reviews: ${reviewsResponse.statusText}`);
    }

    const reviews = await reviewsResponse.json();

    // Construct the response
    const response = {
      spare_part: spare_part.data,
      relatedTractors: relatedTractors.data,
      relatedSpareParts: relatedSpareParts.data,
      reviews: reviews.data,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching tractor details:', error.message);
    return NextResponse.json(
      { message: 'Failed to fetch tractor details.', error: error.message },
      { status: 500 }
    );
  }
}
