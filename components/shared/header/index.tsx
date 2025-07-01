import { APP_NAME } from "@/lib/constants";

import Link from "next/link";
import React from "react";
import Menu from "./menu";
import UserButton from "./user-button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full block">
      <div className="wrapper flex justify-between items-center border-b-2">
        <div className="flex-start">
          <Link href="/" className="flex-start ml-4 ">
            <Image
              src="/images/logo.svg"
              alt={APP_NAME}
              height={48}
              width={48}
            />
          </Link>
        </div>

        <Menu />

        <div className="hidden md:flex  max-w-xs">
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
