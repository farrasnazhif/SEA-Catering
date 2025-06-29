import CheckoutSteps from "@/components/shared/checkout-steps";
import PersonalizeForm from "./personalize-form";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const AboutYouPage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <CheckoutSteps current={0} />
      <PersonalizeForm />
    </SessionProvider>
  );
};

export default AboutYouPage;
