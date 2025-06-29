"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

const allergies = ["Dairy", "Gluten", "Peanuts", "Chicken", "Beef", "Pork"];

const AboutYouForm = () => {
  const { data: session } = useSession();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  const handleToggleAllergy = (item: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleAddCustomAllergy = () => {
    const trimmed = customAllergy.trim();
    if (trimmed && !selectedAllergies.includes(trimmed)) {
      setSelectedAllergies([...selectedAllergies, trimmed]);
    }
    setCustomAllergy("");
  };

  return (
    <div className="mx-auto px-6 wrapper text-black mt-8 mb-12 max-w-3xl">
      <div className="flex-col flex-center gap-6">
        <div className="text-center">
          <h2 className="h3-bold">Let’s Personalize Your Meals</h2>
        </div>

        <form action="">
          <div className="space-y-6 md:w-[40rem] w-[20rem]">
            <div>
              <Label>Fullname</Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="p-5 mt-2"
                placeholder="Enter your fullname"
                required
                defaultValue={session?.user?.name!}
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

            <div>
              <Label>Allergies or Restrictions</Label>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {allergies.map((item) => (
                  <Label
                    key={item}
                    className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent/50"
                  >
                    <Checkbox
                      checked={selectedAllergies.includes(item)}
                      onCheckedChange={() => handleToggleAllergy(item)}
                    />
                    <p className="text-sm font-medium">{item}</p>
                  </Label>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Input
                  type="text"
                  value={customAllergy}
                  onChange={(e) => setCustomAllergy(e.target.value)}
                  placeholder="Add others"
                  className="p-5"
                />
                <Button
                  type="button"
                  onClick={handleAddCustomAllergy}
                  variant="default"
                  className="p-5"
                >
                  Add
                </Button>
              </div>

              {selectedAllergies.length > 0 && (
                <div className="mt-3 text-sm text-muted-foreground ">
                  <p className="font-medium mb-1">Selected Restrictions:</p>
                  <div className="flex justify-center flex-wrap gap-2">
                    {selectedAllergies.map((a, idx) => (
                      <div
                        key={idx}
                        className="flex items-center  gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2"
                      >
                        {a}
                        <button
                          type="button"
                          className="ml-1 text-blue-500 hover:text-red-500"
                          onClick={() =>
                            setSelectedAllergies((prev) =>
                              prev.filter((item) => item !== a)
                            )
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
