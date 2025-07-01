import { cn } from "@/lib/utils";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between flex-row space-x-2  mt-10 px-6 md:px-24">
      {["About You", "Checkout", "Your Order"].map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "p-2 w-56 rounded-full text-center text-sm",
              index === current ? "bg-black text-white" : ""
            )}
          >
            {step}
          </div>
          {step !== "Your Order" && (
            <hr className="w-24 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
