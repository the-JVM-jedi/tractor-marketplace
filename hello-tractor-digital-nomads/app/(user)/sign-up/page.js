'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';

export default function AuthCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const endpoint = "/api/signup";
      const formData = {
        name: data.name,
        email: data.signupEmail,
        phone: data.phone,
        password: data.password
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Login successful');
        toast.success('Signup successful');
        router.push('/verification');
      } else {
        throw new Error(responseData.error || `Failed to sign up`);
      }
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen">
      {/* Split Background */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        {/* Left Side with Pink Background and Image */}
        <div className="w-full lg:w-1/2 bg-primary relative flex items-center justify-center p-4 lg:p-0">
          <Image
            src="/AzizaGesture1.png"
            alt="Left Side Image"
            className="object-contain w-full h-auto max-h-[60vh] lg:max-h-[80vh]"
            width={500}
            height={500}
          />
        </div>

        {/* Right Side with White Background and Image */}
        <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-4 lg:p-0">
          <Image
            src="/GitongaGesture1.png"
            alt="Right Side Image"
            className="object-contain w-full h-auto max-h-[60vh] lg:max-h-[60vh]"
            width={500}
            height={500}
          />
        </div>

        <div className="absolute top-4 left-4 z-10">
          <Image
            src="/HT_LOGO_RGB_white 1.png"
            alt="Logo"
            className="w-32 lg:w-48 h-auto"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Auth Card */}
      <div className="z-10 p-6 lg:p-8 w-[90%] max-w-[500px] bg-white rounded-lg shadow-md mt-[20vh] lg:mt-0">
        {/* Top Toggle Link */}
        <div className="text-right mb-4 lg:mb-6">
          <span className="text-sm text-gray-500">Already have an account? </span>
          <button onClick={() => router.push('/sign-in')} className="text-sm text-pink-500 hover:text-pink-600">
            Sign In
          </button>
        </div>

        {/* Dynamic Card Title */}
        <h1 className="text-xl lg:text-2xl font-avenir font-extralight text-gray-900">Welcome to Hello Tractor</h1>
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 font-merriweather">Sign Up</h2>

        {/* Dynamic Form */}
        <form className="mt-4 lg:mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required"
              })}
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="w-full lg:w-1/2 mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                {...register("signupEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.signupEmail && (
                <span className="text-red-500 text-sm">{errors.signupEmail.message}</span>
              )}
            </div>
            <div className="w-full lg:w-1/2 mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+-]+$/,
                    message: "Invalid phone number"
                  }
                })}
                type="tel"
                placeholder="Your phone number"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password"
              placeholder="Your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-hibiscus hover:bg-hibiscus w-full px-4 py-2 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Social Login Options */}
        <div>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Image
                className="w-5 h-5 mr-2"
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
              />
              Sign Up with Google
            </button>
            <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Image
                className="w-5 h-5 mr-2"
                src="/Facebook.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

