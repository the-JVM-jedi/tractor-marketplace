import { NextResponse } from 'next/server'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    const token = searchParams.get('token')

    console.log('This is the token', token);

    const DIRECTUS_URL = process.env.DIRECTUS_URL;

    // Check if the token is provided
    if (!token) {
        throw new Error("Token is required for email verification");
    }

    try {
        // Make the POST request to verify the email
        const response = await fetch(`${DIRECTUS_URL}/users/register/verify-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });
        console.log(response)


        if (response.status === 404) {
            return NextResponse.json({
                message: 'success'
            })
        }
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}