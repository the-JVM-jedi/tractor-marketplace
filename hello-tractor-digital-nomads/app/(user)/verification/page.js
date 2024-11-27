import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
export default function Trail() {
    return (
        <>
            <Toaster />
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-8 w-[300px] lg:w-[500px] bg-white rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
                    <p className="mt-4 text-gray-600">
                        A verification link has been sent to your email. Please check your inbox and follow the instructions to verify your account.
                    </p>
                    <p className="mt-4 text-gray-600">
                        Once verified, you can come back to log in.
                    </p>
                    <Link href="/" className="mt-6 inline-block text-hibiscus hover:text-hibiscus-600">
                        Go Back
                    </Link>
                </div>
            </div>
        </>
    );
}