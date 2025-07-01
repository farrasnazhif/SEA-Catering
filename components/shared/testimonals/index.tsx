import { auth } from "@/auth";
import TestimonialForm from "./testimonial-form";
import { SessionProvider } from "next-auth/react";
import { getAllProducts, getProductById } from "@/lib/actions/product.actions";
import TestimonialsList from "./testimonial-list";

const Testimonials = async ({ productId }: { productId: string }) => {
  const session = await auth();

  const products = await getAllProducts();

  return (
    <SessionProvider session={session}>
      <div className="mx-auto px-6 wrapper text-black mt-16 mb-8 max-w-6xl">
        <h2 className="mdtext-2xl text-xl font-bold text-center">
          What Our Happy Customers Say
        </h2>

        <div className="w-full mt-8">
          <TestimonialsList />
        </div>

        <div className="flex-center mt-8 mb-8">
          <TestimonialForm products={products} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default Testimonials;
