import DeleteDialog from "@/components/shared/user-delete-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteSubscriptionByIndex,
  getMySubscription,
} from "@/lib/actions/subscription.actions";
import { formatDateTime } from "@/lib/utils";

const PlanPage = async () => {
  const subscriptions = await getMySubscription();

  return (
    <div className="space-y-6">
      <h2 className="h2-bold">My Plan</h2>

      {/* DESKTOP */}
      <div className="md:overflow-x-auto hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal Plan</TableHead>
              <TableHead>Meal Type</TableHead>
              <TableHead>Delivery Days</TableHead>
              <TableHead>Delivered Until</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub, index) => (
              <TableRow key={index}>
                <TableCell>{sub.mealPlan}</TableCell>
                <TableCell>{sub.mealTypes.join(", ")}</TableCell>
                <TableCell>{sub.deliveryDays.join(", ")}</TableCell>
                <TableCell>{formatDateTime(sub.finishedAt).dateOnly}</TableCell>
                <TableCell>
                  <DeleteDialog
                    index={index}
                    action={deleteSubscriptionByIndex}
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
              <TableHead>Meal Plan</TableHead>
              <TableHead>Delivered Until</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub, index) => (
              <TableRow key={index}>
                <TableCell>{sub.mealPlan}</TableCell>
                <TableCell>{formatDateTime(sub.finishedAt).dateOnly}</TableCell>
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
                            Your Plan Details
                          </DialogTitle>
                        </AlertDialogHeader>
                        <div className="text-sm ">
                          <Table>
                            <TableBody>
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
                                  Delivered Until
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
                      index={index}
                      action={deleteSubscriptionByIndex}
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

export default PlanPage;
