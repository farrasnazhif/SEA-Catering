import CheckoutSteps from "@/components/shared/checkout-steps";
import AboutYouForm from "./about-you-form";

const AboutYouPage = () => {
  return (
    <>
      <CheckoutSteps current={0} />
      <AboutYouForm />
    </>
  );
};

export default AboutYouPage;
