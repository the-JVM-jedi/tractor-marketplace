import CredentialsProvider from 'next-auth/providers/credentials';
import directus from '@/lib/directus';
const DIRECTUS_URL = process.env.DIRECTUS_URL;

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                console.log('This are the credentials', credentials)
                const email = credentials?.email;
                const password = credentials?.password;

                console.log('This are the values passed to directus', email, password)

                // Add logic here to look up the user from the credentials supplied
                try {
                    // const user = await directus.login(email, password);
                    //Authenticate user with Directus
                    const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
                        cache: 'no-store',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    console.log('This is the response',response)

                    const data = await response.json();

                    console.log('This is the user  ' + JSON.stringify(data));
                    const user = data.data;

                    console.log('This is the user in the backend', user)

                    return user;
                } catch (error) {
                    // console.log('This is the error ' + JSON.stringify(error));
                    throw new Error('Email address or password is invalid');
                }

            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async jwt({
            token,
            user,
            account,
        }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        }
    },
};