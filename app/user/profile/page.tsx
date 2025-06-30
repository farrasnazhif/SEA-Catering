import CheckoutSteps from "@/components/shared/checkout-steps";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ProfileForm from "./profile-form";

const AboutYouPage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ProfileForm />
    </SessionProvider>
  );
};

export default AboutYouPage;
