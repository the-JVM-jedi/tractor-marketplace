import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'
const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN; // Static token for your API

// Handler for POST requests
export async function POST(request) {
  try {
    // Parse the request body to get spare part details
    const body = await request.json();
    const { brand_name, model, price, quantity, image_url } = body;

    // Ensure all required fields are provided
    if (!brand_name || !model || !price || !quantity) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Extract session details (from directus_users)
    const session = await getServerSession(); // Replace with your session handling logic
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: 'User is not authenticated.' },
        { status: 401 }
      );
    }
      
    const directus_user_id = session.user_id;

    // Fetch seller_id from the custom users table
    const sellerResponse = await fetch(
      `${DIRECTUS_URL}/items/users?filter[directus_user_id][_eq]=${directus_user_id}`,
      {
        headers: {
          Authorization: `Bearer ${DIRECTUS_API_TOKEN}`,
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
      brand_name,
      model,
      price,
      view_count : 0,
      quantity,
      image_url,
      seller_id, // Tie the spare part to the seller
    };

    // Call Directus API to add the spare part
    const sparePartResponse = await fetch(`${DIRECTUS_URL}/items/spare_part`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DIRECTUS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!sparePartResponse.ok) {
      throw new Error(`Failed to add spare part: ${sparePartResponse.statusText}`);
    }

    const responseData = await sparePartResponse.json();

    // Return success response
    return NextResponse.json(
      { message: 'Spare part added successfully!', data: responseData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding spare part:', error.message);
    return NextResponse.json(
      { message: 'Failed to add spare part.', error: error.message },
      { status: 500 }
    );
  }
}
