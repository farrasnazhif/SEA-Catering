import Link from "next/link";
import { Button } from "./button";

const PricingPlanButton = ({ className }: { className?: string }) => {
  return (
    <Button asChild className={`text-lg p-6 font-semibold ${className}`}>
      <Link href="/pricing-plans">See Pricing & Plans</Link>
    </Button>
  );
};

export default PricingPlanButton;
