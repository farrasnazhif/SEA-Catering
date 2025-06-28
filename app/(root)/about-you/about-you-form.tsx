"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutYouForm = () => {
  return (
    <div className="mx-auto px-6 wrapper text-black mt-8 mb-12 max-w-3xl">
      <div className="flex-col flex-center gap-6">
        <div className="text-center">
          <h2 className="h3-bold">Let’s Personalize Your Meals</h2>
        </div>

        <form action="">
          <div className="space-y-6 md:w-[32rem] w-[20rem]">
            <div>
              <Label>Fullname</Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="p-5 mt-2"
                placeholder="Enter your fullname"
                required
              />
            </div>

            <div>
              <Label>Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="p-5 mt-2"
                placeholder="Enter your phone"
                required
              />
            </div>

            <div>
              <Label>Delivery Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                className="p-5 mt-2"
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="mt-6">
              <Link href="/subscription">
                <Button type="submit" className="gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutYouForm;
