import { auth } from "@/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

const navigations = [{ name: "Home", href: "/" }];

const DesktopNavigationMenu = async () => {
  const session = await auth();

  const subscriptionHref = session ? "/personalize" : "/sign-in";

  return (
    <nav className="hidden lg:flex w-full max-w-xs">
      <div className="flex items-center gap-4">
        {navigations.map((nav) => (
          <Link
            key={nav.name}
            href={nav.href}
            className="text-sm font-medium hover:text-slate-500 transition-all"
          >
            {nav.name}
          </Link>
        ))}

        <Link
          href={subscriptionHref}
          className="text-sm font-medium hover:text-slate-500 transition-all"
        >
          Subscription
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium hover:text-slate-500 transition-all p-0">
                Meal Plans
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-orange-100 rounded shadow-md p-4">
                <ul className="flex flex-col gap-2 min-w-[180px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/meal-plans/diet"
                        className="hover:text-slate-500"
                      >
                        Diet Plan
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/meal-plans/protein"
                        className="hover:text-slate-500"
                      >
                        Protein Plan
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/meal-plans/royal"
                        className="hover:text-slate-500"
                      >
                        Royal Plan
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium hover:text-slate-500 transition-all p-0">
                Contact Us
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" rounded shadow-md p-4 bg-orange-100">
                <ul className="flex flex-col gap-2 min-w-[180px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <div className="flex-start gap-3">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <p className="text-sm">Brian - 08123456789</p>
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default DesktopNavigationMenu;
