import { NextResponse } from 'next/server';

// Directus API configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL; // e.g., 'https://your-directus-instance.com'

// Handler for GET requests
export async function GET() {
  try {
    // Fetch dealers with their associated contact and location details
    const dealersResponse = await fetch(`${DIRECTUS_URL}/items/dealer?fields=dealer_id,description`);

    if (!dealersResponse.ok) {
      throw new Error(`Failed to fetch dealers: ${dealersResponse.statusText}`);
    }

    const dealersData = await dealersResponse.json();

    // Fetch contact details for each dealer (supporting multiple contacts)
    const contacts = await Promise.all(
      dealersData.data.map(async (dealer) => {
        const contactResponse = await fetch(`${DIRECTUS_URL}/items/contact?filter[entity_id][_eq]=${dealer.dealer_id}&filter[entity_type][_eq]=dealer`);

        if (!contactResponse.ok) {
          throw new Error(`Failed to fetch contact for dealer ${dealer.dealer_id}: ${contactResponse.statusText}`);
        }

        return contactResponse.json();
      })
    );

    // Fetch location details for each dealer (supporting multiple locations)
    const locations = await Promise.all(
      dealersData.data.map(async (dealer) => {
        const locationResponse = await fetch(`${DIRECTUS_URL}/items/location?filter[entity_id][_eq]=${dealer.dealer_id}&filter[entity_type][_eq]=dealer`);

        if (!locationResponse.ok) {
          throw new Error(`Failed to fetch location for dealer ${dealer.dealer_id}: ${locationResponse.statusText}`);
        }

        return locationResponse.json();
      })
    );

    // Merge dealer, contact, and location data and filter out unnecessary fields
    const dealersWithDetails = dealersData.data.map((dealer, index) => ({
      dealer_id: dealer.dealer_id,
      brand_name: dealer.brand_name,
      contacts: contacts[index].data.map(contact => ({
        phone_number: contact.phone_number,
        email_address: contact.email_address,
      })), // Only keep phone_number and email_address
      locations: locations[index].data.map(location => ({
        location_text: location.location_text,
      })), // Only keep location_text
    }));

    // Return the combined data to the frontend
    return NextResponse.json(dealersWithDetails, { status: 200 });
  } catch (error) {
    console.error('Error fetching dealers:', error.message);
    return NextResponse.json(
      { message: 'Failed to fetch dealers', error: error.message },
      { status: 500 }
    );
  }
}
