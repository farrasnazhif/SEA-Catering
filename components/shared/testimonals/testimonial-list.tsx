import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getAllTestimonials } from "@/lib/actions/testimonial.actions";
import { StarIcon } from "lucide-react";

const TestimonialsList = async () => {
  const testimonials = await getAllTestimonials();

  return (
    <div className="w-full mt-10">
      <Carousel>
        <CarouselContent className="gap-0">
          {testimonials.map((t) => {
            const firstName = t.user?.name?.split(" ")[0] || "User";
            const productName = t.product?.name || "Protein Plan";

            return (
              <CarouselItem
                key={t.id}
                className="basis-auto flex justify-center "
              >
                <div className="bg-slate-100 border shadow-md rounded-lg p-6 w-[15rem] h-full flex flex-col items-center text-center ">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {firstName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    – {productName} –
                  </p>
                  <p className="text-sm text-gray-700 mb-3">{t.description}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TestimonialsList;
