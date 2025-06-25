import CheckoutSteps from "@/components/shared/checkout-steps";
import SubscriptionForm from "./subscription-form";

const SubscriptionPage = () => {
  return (
    <>
      <CheckoutSteps current={1} />
      <SubscriptionForm />
    </>
  );
};

export default SubscriptionPage;
