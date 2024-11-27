import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'

export async function POST(request) {
  try {
    if (!DIRECTUS_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
  
    // Validate Authorization Header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const accessToken = authHeader.split(' ')[1];

    // Parse the request body to get input parameters
    const body = await request.json();
    const { listing_id, entity_type, quantity } = body;

    // Validate inputs
    if (!listing_id || !entity_type || !quantity) {
      return NextResponse.json(
        { message: 'Missing required parameters: listing_id, entity_type, or quantity.' },
        { status: 400 }
      );
    }

    if (!['tractor', 'spare_part'].includes(entity_type)) {
      return NextResponse.json(
        { message: 'Invalid entity_type. Must be "tractor" or "spare_part".' },
        { status: 400 }
      );
    }

    // Fetch the listing details to update the quantity and validate existence
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

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found.' }, { status: 404 });
    }

    // Check if the quantity to be sold is greater than the available stock
    if (listing.quantity < quantity) {
      return NextResponse.json(
        { message: 'Insufficient stock for sale.' },
        { status: 400 }
      );
    }

    // Decrease the quantity of the listing by the sold amount
    const updatedQuantity = listing.quantity - quantity;
    await fetch(`${DIRECTUS_URL}/items/${table}/${listing_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: updatedQuantity }),
    });

    // Insert a record in the sales table
    const salesData = {
      entity_type,
      entity_id: listing_id,
      price: listing.price, // Assuming the price is stored in the listing
      quantity_sold: quantity,
      date: new Date().toISOString(),
    };

    const salesResponse = await fetch(`${DIRECTUS_URL}/items/sales`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salesData),
    });

    if (!salesResponse.ok) {
      throw new Error(`Failed to record the sale: ${salesResponse.statusText}`);
    }

    const salesResult = await salesResponse.json();

    // Return success message
    return NextResponse.json(
      { message: 'Sale recorded successfully!', salesData: salesResult.data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing sale:', error.message);
    return NextResponse.json(
      { message: 'Failed to process sale.', error: error.message },
      { status: 500 }
    );
  }
}
