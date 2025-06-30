"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center  px-4 py-[13rem] min-h-screen text-center space-y-6">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">
          Woohoo! Your subscription is confirmed!
        </h1>
        <p className="text-muted-foreground text-sm">
          Delicious meals are coming your way soon!
        </p>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => (window.location.href = "/user/plan")}
        >
          Check Your Meal Plan
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
