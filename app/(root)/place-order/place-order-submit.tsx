"use client";

import { updateUserSubsription } from "@/lib/actions/user.action";
import { Subscription } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PlaceOrderSubmit = ({ subscription }: { subscription: Subscription }) => {
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await updateUserSubsription(subscription);

    if (res.success) {
      toast.success("Order placed!");
      localStorage.removeItem("pendingSubscription");
      router.push("/thank-you");
    } else {
      toast.error("Failed to place order.");
    }
  };

  return (
    <Button onClick={handleSubmit} className="w-full">
      Confirm Order
    </Button>
  );
};

export default PlaceOrderSubmit;
