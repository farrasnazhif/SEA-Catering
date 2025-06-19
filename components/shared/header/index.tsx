import { APP_NAME } from "@/lib/constants";

import Link from "next/link";
import React from "react";
import Menu from "./menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full block">
      <div className="wrapper flex justify-between items-center ">
        <div className="flex-start">
          <Link href="/" className="flex-start ml-4 ">
            <h1 className="h3-bold">{APP_NAME}</h1>
          </Link>
        </div>

        <Menu />

        <div className="hidden md:flex  max-w-xs">
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
