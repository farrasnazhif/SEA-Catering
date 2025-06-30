import DeleteDialog from "@/components/shared/delete-dialog";
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
import convertIDR from "@/utils/currency";

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
              <TableHead>Price</TableHead>
              <TableHead>Delivery Days</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub, index) => (
              <TableRow key={index}>
                <TableCell>{sub.mealPlan}</TableCell>
                <TableCell>{sub.mealTypes.join(", ")}</TableCell>
                <TableCell>{convertIDR(sub.price)}</TableCell>
                <TableCell>{sub.deliveryDays.join(", ")}</TableCell>
                <TableCell className="text-muted-foreground">
                  Coming Soon
                </TableCell>
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
    </div>
  );
};

export default PlanPage;
