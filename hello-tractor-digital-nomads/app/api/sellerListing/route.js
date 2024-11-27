import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'


export async function GET(request) {
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
    // Extract query parameters from the URL
    const url = new URL(request.url);
    const entity_type = url.searchParams.get('entity_type');

    // Validate the entity_type input
    if (!entity_type || !['tractor', 'spare_part'].includes(entity_type)) {
      return NextResponse.json(
        { message: 'Invalid entity_type. Must be "tractor" or "spare_part".' },
        { status: 400 }
      );
    }

    // Extract session details (from directus_users)
    // Fetch logged-in user information from Directus
    const sellerResponse = await fetch(`${DIRECTUS_URL}/users/me`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
      },
  });

  if (!sellerResponse.ok) {
      const error = await sellerResponse.json();
      return NextResponse.json({ error }, { status: sellerResponse.status });
  }

  const sellerData = await sellerResponse.json();
  const directus_user_id = sellerData.data.id;

    // Fetch the seller's id from the custom users table using the directus_user_id
    const userResponse = await fetch(
      `${DIRECTUS_URL}/items/users?filter[directus_user_id][_eq]=${directus_user_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user information.');
    }

    const userData = await userResponse.json();

    if (!userData.data || userData.data.length === 0) {
      return NextResponse.json(
        { message: 'Seller not found in the custom users table.' },
        { status: 404 }
      );
    }

    const seller_id = userData.data[0].user_id; // Extract seller_id

    // Query the appropriate table (tractors or spare_parts) based on entity_type
    const table = entity_type === 'tractor' ? 'tractor' : 'spare_part';

    // Fetch the seller's listings from the appropriate table
    const listingsResponse = await fetch(
      `${DIRECTUS_URL}/items/${table}?filter[seller_id][_eq]=${seller_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!listingsResponse.ok) {
      throw new Error(`Failed to fetch listings: ${listingsResponse.statusText}`);
    }

    const listingsData = await listingsResponse.json();

    // Return the listings in the response
    return NextResponse.json(
      { listings: listingsData.data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching seller listings:', error.message);
    return NextResponse.json(
      { message: 'Failed to fetch seller listings.', error: error.message },
      { status: 500 }
    );
  }
}
