import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'

export async function GET(request, { params }) {
  if (!DIRECTUS_URL) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // Validate Authorization Header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    // Parse the URL to extract query parameters
    const { listing_id } = params; // Extract tractor ID from URL params
    const url = new URL(request.url);
    const entity_type = url.searchParams.get('entity_type');

    // Validate inputs
    if (!listing_id || !entity_type || !['tractor', 'spare_part'].includes(entity_type)) {
      return NextResponse.json(
        { message: 'Missing or invalid parameters: listing_id or entity_type.' },
        { status: 400 }
      );
    }

    // Fetch listing details from the appropriate table (tractor or spare_part)
    const table = entity_type === 'tractor' ? 'tractor' : 'spare_part';

    const listingResponse = await fetch(
      `${DIRECTUS_URL}/items/${table}/${listing_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!listingResponse.ok) {
      throw new Error(`Failed to fetch listing details: ${listingResponse.statusText}`);
    }

    const listingData = await listingResponse.json();
    const listing = listingData.data;
    console.log(listing);

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found.' }, { status: 404 });
    }

    // Compute sales analytics (sales made, revenue generated) from the sales table
    const salesResponse = await fetch(
      `${DIRECTUS_URL}/items/sales?filter[entity_type][_eq]=${entity_type}&filter[entity_id][_eq]=${listing_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!salesResponse.ok) {
      throw new Error(`Failed to fetch sales data: ${salesResponse.statusText}`);
    }

    const salesData = await salesResponse.json();
    const totalSales = salesData.data.reduce((acc, sale) => acc + sale.quantity_sold, 0);
    const totalRevenue = salesData.data.reduce((acc, sale) => acc + (sale.quantity_sold * sale.price), 0);

    // Fetch all relevant location information (there could be multiple locations for the listing)
    const locationResponse = await fetch(
      `${DIRECTUS_URL}/items/location?filter[entity_id][_eq]=${listing.seller_id}&filter[entity_type][_eq]=user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!locationResponse.ok) {
      throw new Error(`Failed to fetch location data: ${locationResponse.statusText}`);
    }

    const locationData = await locationResponse.json();
    const locations = locationData.data;  // All location records for the seller

    // Fetch reviews for the seller of the listing
    const reviewsResponse = await fetch(
      `${DIRECTUS_URL}/items/review?filter[entity_type][_eq]=${entity_type}&[entity_id][_eq]=${listing_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!reviewsResponse.ok) {
      throw new Error(`Failed to fetch reviews: ${reviewsResponse.statusText}`);
    }

    const reviewsData = await reviewsResponse.json();
    const reviews = reviewsData.data;

    // Return all the combined data
    const responseData = {
      listing: listing,
      salesAnalytics: {
        totalSales,
        totalRevenue,
      },
      locations: locations,  // Multiple locations
      reviews: reviews,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error fetching specific seller listing:', error.message);
    return NextResponse.json(
      { message: 'Failed to fetch specific seller listing.', error: error.message },
      { status: 500 }
    );
  }
}
