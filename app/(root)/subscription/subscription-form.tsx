"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

const SubscriptionForm = () => {
  return (
    <div className="mx-auto px-6 relative wrapper text-black mt-8 mb-8">
      <div className="flex-col flex-center gap-6">
        <div className="flex-col text-center">
          <h2 className="h3-bold">Fuel Your Goals. Eat Smart.</h2>
          <p className="text-sm text-muted-foreground">
            Subscribe now and get access to premium meal plans made just for
            you.
          </p>
        </div>

        <form action="">
          <div className="space-y-6 w-[22rem] md:w-[36rem]">
            <div>
              <Label>Fullname</Label>
              <Input
                id="name"
                name="name"
                type="name"
                className="p-5 mt-2"
                placeholder="Enter your fullname"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <Label>Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="phone"
                className="p-5 mt-2"
                placeholder="Enter your phone"
                required
                autoComplete="phone"
              />
            </div>
            <div>
              <Label className="mb-2">Meal Plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diet Plan">Diet Plan</SelectItem>
                  <SelectItem value="Protein Plan">Protein Plan</SelectItem>
                  <SelectItem value="Royal Plan">Royal Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Meal Types</Label>
              <div className="flex flex-col gap-2 mt-2">
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Breakfast
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Fresh, ready-to-eat meals delivered daily between 6:30 –
                      8:00 AM.
                    </p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Dinner</p>
                    <p className="text-muted-foreground text-sm">
                      Fresh, ready-to-eat meals delivered daily between 6.30 –
                      8:00 PM.
                    </p>
                  </div>
                </Label>
              </div>
            </div>
            <div>
              <Label>Delivery Days</Label>
              <div className="flex gap-2 mt-2">
                <Label className="hover:bg-accent/50 flex items-center gap-2 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Monday</p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-center gap-2 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Tuesday</p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-center gap-2 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Wednesday
                    </p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-center gap-2 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Thursday</p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-center gap-2 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">Friday</p>
                  </div>
                </Label>
              </div>
              <div className="flex gap-2 mt-6">
                <Link href="/place-order">
                  <Button type="submit">
                    <ArrowRight className="w-4 h-4" />
                    Proceed
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
