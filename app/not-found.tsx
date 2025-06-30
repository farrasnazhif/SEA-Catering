"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center  px-4 py-24 justify-center min-h-screen text-center space-y-6">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">Not Found</h1>
        <p className="text-muted-foreground text-sm">
          Could not find requested page
        </p>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => (window.location.href = "/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
