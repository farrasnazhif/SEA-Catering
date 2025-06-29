import CheckoutSteps from "@/components/shared/checkout-steps";
import SubscriptionForm from "./subscription-form";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import { Subscription } from "@/types";

const SubscriptionPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User id not found");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <SubscriptionForm subscription={user.subscription as Subscription} />
    </>
  );
};

export default SubscriptionPage;
