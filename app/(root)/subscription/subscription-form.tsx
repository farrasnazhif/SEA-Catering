"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserSubsription } from "@/lib/actions/user.action";
import { subscriptionDefaultValues } from "@/lib/constants";
import { subscriptionSchema } from "@/lib/validators";
import { Subscription } from "@/types";
import { getErrorMessage } from "@/lib/utils";

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

const getMealPlanPrice = (plan: string) => {
  switch (plan) {
    case "Diet Plan":
      return 30000;
    case "Protein Plan":
      return 40000;
    case "Royal Plan":
      return 60000;
    default:
      return 0;
  }
};

const SubscriptionForm = ({ subscription }: { subscription: Subscription }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: subscription || subscriptionDefaultValues,
  });

  const selectedPlan = form.watch("mealPlan");

  useEffect(() => {
    const price = getMealPlanPrice(selectedPlan ?? "");
    form.setValue("price", price);
  }, [selectedPlan, form]);

  const onSubmit = async (values: z.infer<typeof subscriptionSchema>) => {
    startTransition(async () => {
      const res = await updateUserSubsription(values);

      if (!res.success) {
        toast.error(getErrorMessage(res?.message));
        return;
      }

      router.push("/place-order");
    });
  };

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mealPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Plan</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mealPlans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mealTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Types</FormLabel>
                  <div className="flex flex-col gap-3 mt-2">
                    {mealTypes.map((meal) => (
                      <Label
                        key={meal.id}
                        className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 cursor-pointer"
                      >
                        <Checkbox
                          checked={field.value?.includes(meal.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, meal.id]
                              : field.value.filter((val) => val !== meal.id);
                            field.onChange(newValue);
                          }}
                        />
                        <div className="grid gap-1.5">
                          <p className="text-sm font-medium">{meal.title}</p>
                          <p className="text-muted-foreground text-sm">
                            {meal.desc}
                          </p>
                        </div>
                      </Label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Days</FormLabel>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {deliveryDays.map((day) => (
                      <Label
                        key={day}
                        className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent/50 cursor-pointer"
                      >
                        <Checkbox
                          checked={field.value?.includes(day)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, day]
                              : field.value.filter((val) => val !== day);
                            field.onChange(newValue);
                          }}
                        />
                        <p className="text-[12px] md:text-sm font-medium">
                          {day}
                        </p>
                      </Label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/personalize")}
              >
                Back
              </Button>
              <Button type="submit" className="gap-2" disabled={isPending}>
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
