"use client";

import { useEffect, useState } from "react";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import convertIDR from "@/utils/currency";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Subscription } from "@/types";
import PlaceOrderSubmit from "./place-order-submit";
import { getUserByIdClient } from "@/lib/actions/user.action";
import { User } from "next-auth";

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const formatArray = (arr: string[]) =>
  arr.map((item) => capitalize(item)).join(", ");

const formatTotalPrice = (
  price: number,
  mealTypes: string[],
  deliveryDays: string[]
) => {
  const total = price * mealTypes.length * deliveryDays.length * 4.3;
  return `Rp${total.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const PlaceOrderPage = () => {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      //take subscription data from the localStorage
      const saved = localStorage.getItem("pendingSubscription");
      if (saved) {
        try {
          const parsed: Subscription = JSON.parse(saved);

          // createdAt (tomorrow) and finishedAt (1 month after tomorrow)
          const now = new Date();
          // tomorrow
          now.setDate(now.getDate() + 1);

          const finishedAt = new Date(now);
          finishedAt.setMonth(finishedAt.getMonth() + 1); // 1 month later

          const subscriptionWithDate = {
            ...parsed,
            createdAt: now.toISOString(),
            finishedAt: finishedAt.toISOString(),
          };
          // console.log( subscriptionWithDate);

          setSubscription(subscriptionWithDate);
        } catch (err) {
          console.error("Invalid subscription data", err);
          router.push("/personalize");
          return;
        }
      } else {
        router.push("/personalize");
        return;
      }

      try {
        const res = await getUserByIdClient();
        if (res) setUser(res);
      } catch (error) {
        console.error("Failed to fetch user", error);
        router.push("/personalize");
      }
    };

    loadData();
  }, [router]);

  if (!subscription || !user) return null;

  return (
    <>
      <CheckoutSteps current={2} />
      <div className="wrapper">
        <div className="text-center py-8">
          <h2 className=" text-2xl h2-bold">Confirm Your Meal Plan</h2>
          <p className="text-sm text-muted-foreground">
            Just one step to get your own meal plan!
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 overflow-x-auto space-y-4">
            <Card className=" border border-slate-400">
              <CardContent className="p-4 gap-4 ">
                <h2 className="text-xl pb-4 font-bold">Shipping Address</h2>
                <p>{user.name}</p>
                <p>{user.address}</p>
                <div className="mt-3">
                  <Link href="/personalize">
                    <Button
                      variant="default"
                      className="border border-slate-400 "
                    >
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-400">
              <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4 font-bold">Order Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meal Plan</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Delivery Days</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{capitalize(subscription.mealPlan)}</TableCell>
                      <TableCell>{convertIDR(subscription.price)}</TableCell>
                      <TableCell>
                        {formatArray(subscription.mealTypes)}
                      </TableCell>
                      <TableCell>
                        {formatArray(subscription.deliveryDays)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border border-slate-400">
              <CardContent className="p-4 gap-4 space-y-4">
                <div className="flex justify-between">
                  <div>Monthly Subscription</div>
                  <div>
                    {convertIDR(
                      subscription.price *
                        subscription.mealTypes.length *
                        subscription.deliveryDays.length *
                        4
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Tax + Shipping</div>
                  <div>
                    {convertIDR(
                      subscription.price *
                        subscription.mealTypes.length *
                        subscription.deliveryDays.length *
                        4 *
                        0.075
                    )}
                  </div>
                </div>
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <span className="font-semibold">
                    {formatTotalPrice(
                      subscription.price,
                      subscription.mealTypes,
                      subscription.deliveryDays
                    )}
                  </span>
                </div>
                <PlaceOrderSubmit subscription={subscription} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
