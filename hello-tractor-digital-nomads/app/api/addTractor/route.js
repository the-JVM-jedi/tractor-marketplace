import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'

// Handler for POST requests
export async function POST(request) {
  const DIRECTUS_URL = process.env.DIRECTUS_URL;

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
    // Parse the request body to get tractor details
    const body = await request.json();
    const { make, model, price, hours_used, year_of_manufacturing, engine_power, fuel_type, image_url, quantity } = body;

    // Ensure all required fields are provided
    if (!make || !model || !price || !year_of_manufacturing || !fuel_type || !quantity) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Extract session details (from directus_users)
    // Fetch logged-in user information from Directus
    const userResponse = await fetch(`${DIRECTUS_URL}/users/me`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
      },
  });

  if (!userResponse.ok) {
      const error = await userResponse.json();
      return NextResponse.json({ error }, { status: userResponse.status });
  }

  const userData = await userResponse.json();
  const directus_user_id = userData.data.id;


    // Fetch seller_id from the custom users table
    const sellerResponse = await fetch(
      `${DIRECTUS_URL}/items/users?filter[directus_user_id][_eq]=${directus_user_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!sellerResponse.ok) {
      throw new Error('Failed to fetch seller information.');
    }

    const sellerData = await sellerResponse.json();

    if (!sellerData.data || sellerData.data.length === 0) {
      return NextResponse.json(
        { message: 'Seller not found in the custom users table.' },
        { status: 404 } 
      );
    }

    const seller_id = sellerData.data[0].user_id; // Seller ID from the custom `users` table

    // Prepare payload for Directus
    const payload = {
      make,
      model,
      price,
      hours_used,
      year_of_manufacturing,
      engine_power,
      fuel_type,
      image_url,
      view_count : 0,
      quantity,
      seller_id, // Tie the tractor to the seller
    };

    // Call Directus API to add the tractor
    const tractorResponse = await fetch(`${DIRECTUS_URL}/items/tractor`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!tractorResponse.ok) {
      throw new Error(`Failed to add tractor: ${tractorResponse.statusText}`);
    }

    const responseData = await tractorResponse.json();

    // Return success response
    return NextResponse.json(
      { message: 'Tractor added successfully!', data: responseData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding tractor:', error.message);
    return NextResponse.json(
      { message: 'Failed to add tractor.', error : error.message },
      { status: 500 }
    );
  }
}