import { auth } from "@/auth";
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
import { getUserById } from "@/lib/actions/user.action";
import { Subscription } from "@/types";
import convertIDR from "@/utils/currency";

import Link from "next/link";
import { redirect } from "next/navigation";

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

const PlaceOrderPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!session) redirect("/personalize");

  const userSubscription = user.subscription as Subscription;

  return (
    <>
      <CheckoutSteps current={2} />
      <div className="wrapper">
        <h1 className="py-4 text-2xl h2-bold">Your Order</h1>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 overflow-x-auto space-y-4">
            <Card>
              <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4 font-bold">Shipping Address</h2>
                <p>{user.name}</p>
                <p>{user.address}</p>
                <div className="mt-3">
                  <Link href="/personalize">
                    <Button variant="outline">Edit</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
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
                      <TableCell>
                        {capitalize(userSubscription.mealPlan)}
                      </TableCell>
                      <TableCell>
                        {convertIDR(userSubscription.price)}
                      </TableCell>
                      <TableCell>
                        {formatArray(userSubscription.mealTypes)}
                      </TableCell>
                      <TableCell>
                        {formatArray(userSubscription.deliveryDays)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-4 gap-4 space-y-4">
                <div className="flex justify-between">
                  <div>Items</div>
                  <div>
                    {convertIDR(
                      userSubscription.price *
                        userSubscription.mealTypes.length *
                        userSubscription.deliveryDays.length
                    )}
                  </div>
                </div>
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <span className="font-semibold">
                    {formatTotalPrice(
                      userSubscription.price,
                      userSubscription.mealTypes,
                      userSubscription.deliveryDays
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
