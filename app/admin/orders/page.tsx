import { auth } from "@/auth";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllSubscriptions } from "@/lib/actions/subscription.actions";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

const AdminOrdersPage = async () => {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const subscriptions = await getAllSubscriptions();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h1 className="h2-bold">Orders</h1>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub, idx) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.userName}</TableCell>
                {/* <TableCell>{convertIDR(sub.totalPrice)}</TableCell> */}
                {sub.mealPlan}
                <TableCell className="space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${sub.id}`}>Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
