import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'

// Helper function to build query string for filters
function buildFilterQuery(filters) {
  if (!filters) return '';
  try {
    const parsedFilters = JSON.parse(filters);

    return Object.entries(parsedFilters)
      .map(([field, condition]) => {
        if (typeof condition === 'object') {
          return Object.entries(condition)
            .map(
              ([operator, value]) =>
                `filter[${field}][${operator}]=${encodeURIComponent(value)}`
            )
            .join('&');
        }
        return `filter[${field}][_eq]=${encodeURIComponent(condition)}`;
      })
      .join('&');
  } catch (error) {
    console.error('Invalid filter format. Ignoring this filter:', error, filters);
    return ''; // Ignore invalid filters
  }
}


// Handler for GET requests
export async function GET(request) {
  try {
    // Extract filters from query parameters
    const url = new URL(request.url);
    const tractorFilters = buildFilterQuery(url.searchParams.get('tractor_filters')) || '';
    const sparePartFilters = buildFilterQuery(url.searchParams.get('spare_part_filters')) || '';

    // Fetch tractors with optional filters
    const tractorsResponse = await fetch(`${DIRECTUS_URL}/items/tractor?${tractorFilters}`);

    if (!tractorsResponse.ok) {
      throw new Error(`Failed to fetch tractors: ${tractorsResponse.statusText}`);
    }

    const tractorsData = await tractorsResponse.json();

    // Fetch spare parts with optional filters
    const sparePartsResponse = await fetch(`${DIRECTUS_URL}/items/spare_part?${sparePartFilters}`);

    if (!sparePartsResponse.ok) {
      throw new Error(`Failed to fetch spare parts: ${sparePartsResponse.statusText}`);
    }

    const sparePartsData = await sparePartsResponse.json();

    // Construct the response
    const response = {
      tractors: tractorsData.data,
      spareParts: sparePartsData.data,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json(
      { message: 'Failed to fetch products', error: error.message },
      { status: 500 }
    );
  }
}
