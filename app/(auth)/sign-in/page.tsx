import React from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInForm from "./sign-in-form";

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] w-full h-[650px] max-w-[700px] overflow-hidden rounded-xl shadow-lg bg-white">
        {/* Left Section */}
        <div className="hidden md:block relative h-full w-full bg-[#f5f8ff]">
          <Image
            src="/images/auth-image.jpg"
            alt="Login Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center w-full">
          <h1 className="text-2xl font-bold mb-2 text-center">Welcome!</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Please enter your details.
          </p>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
