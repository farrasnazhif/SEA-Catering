import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";
import { BadgeCheck, MenuIcon, PhoneCall, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileNavigationMenu = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <MenuIcon />
          </button>
        </SheetTrigger>

        <SheetContent className="flex flex-col items-start">
          <SheetTitle>Menu</SheetTitle>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="user">
              <AccordionTrigger>
                <div className="hover:text-slate-500 transition-all flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <p className="text-sm font-medium ">Hi, User</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="/user/profile"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  User Profile
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/user/plan"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  Your Plan
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full text-sm px-2 py-1 hover:bg-slate-700 block text-center"
                >
                  Login
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="new">
              <AccordionTrigger>
                <p className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline">
                  Meal Plans
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="/meal-plan/diet-plan"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  Diet Plan
                </Link>
                <Link
                  href="/meal-plan/protein-plan"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  Protein Plan
                </Link>
                <Link
                  href="/meal-plan/royal-plan"
                  className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
                >
                  Royal Plan
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger>
                <p className="text-md font-medium hover:text-slate-700 transition-all cursor-pointer hover:underline">
                  Contact Us
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div className="block px-2 py-1 text-sm hover:bg-slate-50 rounded flex-start gap-3">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <p className="text-sm">Brian - 08123456789</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link href="/" className="my-8">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={32}
              width={32}
              priority
            />
          </Link>

          <Link href="/subscription" className="flex items-center w-full gap-4">
            <BadgeCheck className="w-6 h-6" strokeWidth={1.3} />
            <p className="font-semibold">Subscription</p>
          </Link>

          <SheetDescription />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavigationMenu;
