import { auth } from "@/auth";

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
import { Metadata } from "next";
import { formatDateTime } from "@/lib/utils";
import DeleteDialog from "@/components/shared/admin-delete-dialog";

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

                <TableCell>{formatDateTime(sub.createdAt).dateOnly}</TableCell>

                <TableCell>{formatDateTime(sub.finishedAt).dateOnly}</TableCell>

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
      </div>
    </div>
  );
};

export default AdminOrdersPage;
