import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import AdminNav from "./admin-nav";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" flex flex-col"></div>
      <div className="border-b contaniner mx-auto">
        <div className=" wrapper flex items-center h-16 px-4">
          <Link href="/" className="w-22">
            <Image
              src="/images/logo.svg"
              alt={APP_NAME}
              height={48}
              width={48}
            />
          </Link>
          <AdminNav className="mx-6" />
          <div className="ml-auto flex items-center spcae-x-4">
            <Link href="/">
              <Button variant="default">Back To Home</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
        {children}
      </div>
    </>
  );
}
