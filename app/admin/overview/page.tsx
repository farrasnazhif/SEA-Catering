import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteSubscriptionByUser,
  getAllSubscriptions,
} from "@/lib/actions/subscription.actions";
import { formatDateTime } from "@/lib/utils";
import convertIDR from "@/utils/currency";
import { BadgeDollarSign, Barcode, CreditCardIcon, Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/admin-delete-dialog";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const AdminOverviewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User Unauthorized");
  }

  const subscriptions = await getAllSubscriptions();

  const computeTotal = (sub: any) => {
    const price =
      typeof sub.price === "number" ? sub.price : parseFloat(sub.price);
    const mealTypes = Array.isArray(sub.mealTypes) ? sub.mealTypes.length : 0;
    const deliveryDays = Array.isArray(sub.deliveryDays)
      ? sub.deliveryDays.length
      : 0;

    return price * mealTypes * deliveryDays * 4.3;
  };

  const totalRevenue = subscriptions.reduce((sum, sub) => {
    const total = computeTotal(sub);
    return sum + (isNaN(total) ? 0 : total);
  }, 0);

  const ordersCount = subscriptions.length;

  const latestSales = [...subscriptions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const uniqueUserIds = new Set(
    subscriptions.map((sub) => sub?.id || sub.userId)
  );
  const usersCount = uniqueUserIds.size;

  return (
    <div className="w-full px-4 space-y-6">
      <h1 className="h2-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BadgeDollarSign />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertIDR(totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCardIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Meal Plan</TableHead>
                  <TableHead>Meal Types</TableHead>
                  <TableHead>Delivery Days</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub, idx) => (
                  <TableRow key={sub.id}>
                    <TableCell>{sub.userName}</TableCell>

                    <TableCell>{sub.mealPlan}</TableCell>

                    <TableCell>{sub.mealTypes.join(", ")}</TableCell>

                    <TableCell>{sub.deliveryDays.join(", ")}</TableCell>

                    <TableCell>
                      {formatDateTime(sub.createdAt).dateOnly}
                    </TableCell>

                    <TableCell>
                      {formatDateTime(sub.finishedAt).dateOnly}
                    </TableCell>

                    <TableCell className="space-x-2">
                      <DeleteDialog
                        userId={sub.userId}
                        index={idx}
                        action={deleteSubscriptionByUser}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
