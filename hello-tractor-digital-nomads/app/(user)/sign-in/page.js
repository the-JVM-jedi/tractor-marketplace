'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { signIn } from 'next-auth/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';

export default function LoginCard() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleFormSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            console.log('This is the repsonse in the frontned', response)

            if (!response?.error) {
                router.push('/');
                router.refresh();
                toast.success('Successfully Logged in');
            } else {
                toast.error(response.status === 401 ? 'Your email or password is incorrect' : 'An error occurred');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen w-full">
            {/* Background */}
            <div className="absolute inset-0 flex flex-col md:flex-row">
                {/* Left Side with Pink Background and Image */}
                <div className="w-full md:w-1/2 bg-primary relative flex items-center justify-center p-4 md:p-8">
                    <Image
                        src="/AzizaGesture1.png"
                        alt="Left Side Image"
                        className="object-contain w-full h-auto max-h-[60vh] md:max-h-[80vh]"
                        width={500}
                        height={500}
                    />
                </div>

                {/* Right Side with White Background and Image */}
                <div className="w-full md:w-1/2 bg-white relative flex items-center justify-center p-4 md:p-8">
                    <Image
                        src="/GitongaGesture1.png"
                        alt="Right Side Image"
                        className="object-contain w-full h-auto max-h-[60vh] md:max-h-[80vh]"
                        width={500}
                        height={500}
                    />
                </div>
            </div>

            {/* Logo */}
            <div className="absolute top-4 left-4 z-10">
                <Image
                    src="/HT_LOGO_RGB_white 1.png"
                    alt="Logo"
                    className="w-32 md:w-48 h-auto"
                    width={192}
                    height={48}
                />
            </div>

            {/* Login Form */}
            <div className="z-10 p-6 md:p-8 w-[90%] max-w-[500px] bg-white rounded-lg shadow-md">
                <div className="text-right mb-6">
                    <span className="text-sm text-gray-500">No Account? </span>
                    <button
                        onClick={() => router.push('/sign-up')}
                        className="text-sm text-pink-500 hover:text-pink-600"
                    >
                        Sign Up
                    </button>
                </div>

                <h1 className="text-xl md:text-2xl font-avenir font-extralight text-gray-900">Welcome to Hello Tractor</h1>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-merriweather mt-2">Sign In</h2>

                <form className="mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Enter your email address
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            placeholder="Username or email address"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibiscus"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {!showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-hibiscus hover:bg-hibiscus/90 w-full px-4 py-2 text-white rounded-lg disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>

                {/* Social Login Options */}
                <div className="mt-6">
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Image
                                className="w-5 h-5 mr-2"
                                src="/google.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            Sign In with Google
                        </button>
                        <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Image
                                className="w-5 h-5 mr-2"
                                src="/Facebook.png"
                                alt="Facebook"
                                width={20}
                                height={20}
                            />
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

