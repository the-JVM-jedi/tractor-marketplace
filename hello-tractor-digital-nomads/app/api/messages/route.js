import { NextResponse } from 'next/server';

export async function GET(req) {
    const DIRECTUS_URL = process.env.DIRECTUS_URL;

    if (!DIRECTUS_URL) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Validate Authorization Header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];

    try {
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
        const userId = userData.data.id;

        // Fetch messages where the user is either sender or receiver
        const messagesResponse = await fetch(
            `${DIRECTUS_URL}/items/messages?filter[_or][0][user_created][_eq]=${userId}&filter[_or][1][sender_id][_eq]=${userId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!messagesResponse.ok) {
            const error = await messagesResponse.json();
            return NextResponse.json({ error }, { status: messagesResponse.status });
        }

        const messagesData = await messagesResponse.json();
        const messages = messagesData.data;

        // Group messages into chats
        const chats = [];
        const chatMap = {};

        messages.forEach((message) => {
            const { sender_id, receiver_id } = message;

            // Generate a unique chat ID by sorting the participant IDs
            const key = [sender_id, receiver_id].sort().join("_");

            if (!chatMap[key]) {
                chatMap[key] = {
                    chat_id: key,
                    participant_ids: [sender_id, receiver_id].sort(),
                    messages: [],
                };
                chats.push(chatMap[key]);
            }
            chatMap[key].messages.push(message);
        });

        // Sort messages by timestamp within each chat
        chats.forEach((chat) =>
            chat.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        );

        return NextResponse.json(chats, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
