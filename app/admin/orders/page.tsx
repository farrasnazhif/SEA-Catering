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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

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

      {/* DESKTOP */}
      <div className="md:block hidden overflow-x-auto">
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

      {/* MOBILE */}
      <div className="overflow-x-auto md:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub, index) => (
              <TableRow key={index}>
                <TableCell>{sub.userName}</TableCell>
                <TableCell>{formatDateTime(sub.createdAt).dateOnly}</TableCell>
                <TableCell className="space-y-2  ">
                  <div className="flex-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-4">
                        <AlertDialogHeader>
                          <DialogTitle className="text-base">
                            User Plan Details
                          </DialogTitle>
                        </AlertDialogHeader>
                        <div className="text-sm ">
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">
                                  User
                                </TableCell>
                                <TableCell>{sub.userName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Meal Plan
                                </TableCell>
                                <TableCell>{sub.mealPlan}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Meal Types
                                </TableCell>
                                <TableCell>
                                  {sub.mealTypes.join(", ")}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Delivery Days
                                </TableCell>
                                <TableCell>
                                  {sub.deliveryDays.join(", ")}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Start
                                </TableCell>
                                <TableCell>
                                  {formatDateTime(sub.createdAt).dateOnly}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  End
                                </TableCell>
                                <TableCell>
                                  {formatDateTime(sub.finishedAt).dateOnly}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DeleteDialog
                      userId={sub.userId}
                      index={index}
                      action={deleteSubscriptionByUser}
                    />
                  </div>
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
