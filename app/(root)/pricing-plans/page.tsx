import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const PricingPlanPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center  px-4 py-[12rem] min-h-screen text-center space-y-6">
      <div className="w-full max-w-md bg-transparent rounded-lg shadow-md p-6 space-y-4 flex-col flex-center">
        <Image
          src="/images/logo.svg"
          width={48}
          height={48}
          alt={`${APP_NAME} logo`}
          priority={true}
        />
        <h1 className="text-2xl font-bold">We&apos;re really sorry</h1>
        <p className="text-muted-foreground text-sm">
          This page is currently unavailable.
        </p>

        {session ? (
          <Link href="/personalize">
            <Button variant="default" className="w-full sm:w-auto">
              Go To Subscription
            </Button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button variant="default" className="w-full sm:w-auto">
              Go To Subscription
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PricingPlanPage;
