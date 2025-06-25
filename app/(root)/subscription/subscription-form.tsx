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
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const mealPlans = [
  { label: "Diet Plan - Rp30.000", value: "Diet Plan" },
  { label: "Protein Plan - Rp40.000", value: "Protein Plan" },
  { label: "Royal Plan - Rp60.000", value: "Royal Plan" },
];

const mealTypes = [
  {
    id: "breakfast",
    title: "Breakfast",
    desc: "Delivered daily between 6:30 – 8:00 AM",
  },
  {
    id: "dinner",
    title: "Dinner",
    desc: "Delivered daily between 6:30 – 8:00 PM",
  },
];

const deliveryDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const SubscriptionForm = () => {
  return (
    <div className="mx-auto px-6 wrapper text-black mt-8 mb-12 max-w-3xl">
      <div className="flex-col flex-center gap-6">
        <div className="text-center">
          <h2 className="h3-bold">Fuel Your Goals. Eat Smart.</h2>
          <p className="text-sm text-muted-foreground">
            Subscribe now and get access to premium meal plans made just for
            you.
          </p>
        </div>

        <form action="">
          <div className="space-y-6">
            <div>
              <Label className="mb-2">Meal Plan</Label>
              <Select>
                <SelectTrigger className="p-5">
                  <SelectValue placeholder="Select your plan" />
                </SelectTrigger>
                <SelectContent>
                  {mealPlans.map((plan) => (
                    <SelectItem key={plan.value} value={plan.value}>
                      {plan.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Meal Types</Label>
              <div className="flex flex-col gap-3 mt-2">
                {mealTypes.map((meal) => (
                  <Label
                    key={meal.id}
                    className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50"
                  >
                    <Checkbox id={meal.id} />
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium">{meal.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {meal.desc}
                      </p>
                    </div>
                  </Label>
                ))}
              </div>
            </div>

            <div>
              <Label>Delivery Days</Label>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {deliveryDays.map((day) => (
                  <Label
                    key={day}
                    className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50"
                  >
                    <Checkbox id={`day-${day}`} />
                    <p className="text-[12px] md:text-sm font-medium">{day}</p>
                  </Label>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link href="/about-you">
                <Button type="submit" variant="outline" className="gap-2">
                  Back
                </Button>
              </Link>
              <Link href="/place-order">
                <Button type="submit" className="gap-2">
                  Proceed
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

export default SubscriptionForm;
