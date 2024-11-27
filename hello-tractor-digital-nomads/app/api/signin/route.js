import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log('this is the signin link')
    let requestData;

    //Validation of req.json() request
    try {
        requestData = await req.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request Body' }, { status: 400 });
    }

    const { email, password } = requestData;

    const DIRECTUS_URL = process.env.DIRECTUS_URL;

    if (!DIRECTUS_URL) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        //Authenticate user with Directus
        const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!authResponse.ok) {
            const error = await authResponse.json();
            return NextResponse.json({ error }, { status: authResponse.status });
        }

        const authData = await authResponse.json();
        console.log('This is the auth data', authData)
        return NextResponse.json({
            message: 'Login successful',
            access_token: authData.data.access_token,
            refresh_token: authData.data.refresh_token,

        });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}