import Link from "next/link";
import { Button } from "./button";

const PricingPlanButton = ({ className }: { className?: string }) => {
  return (
    <div>
      <Link href="/pricing-plans">
        <Button className={`text-lg p-6 font-semibold ${className}`}>
          See Pricing & Plans
        </Button>
      </Link>
    </div>
  );
};

export default PricingPlanButton;
