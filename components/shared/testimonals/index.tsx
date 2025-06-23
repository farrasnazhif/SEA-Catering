import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import TestimonialForm from "./testimonial-form";

const users = [
  {
    id: 1,
    user: "Jane Doe",
    message: "The meals are delicious and saved me so much time!",
    plan: "Diet Plan",
    rating: 5,
  },
  {
    id: 2,
    user: "John Smith",
    message: "Absolutely love the variety and freshness!",
    plan: "Diet Plan",
    rating: 5,
  },
  {
    id: 3,
    user: "Sarah Johnson",
    message: "Healthy, tasty, and convenient—perfect combo.",
    plan: "Diet Plan",
    rating: 5,
  },
  {
    id: 4,
    user: "Michael Lee",
    message: "Royal Plan feels like dining at a fine restaurant.",
    plan: "Diet Plan",
    rating: 5,
  },
  {
    id: 5,
    user: "Emily Davis",
    message: "My fitness coach recommended this—no regrets!",
    plan: "Diet Plan",
    rating: 5,
  },
  {
    id: 6,
    user: "Chris Kim",
    message: "Simple, affordable, and life-changing.",
    plan: "Diet Plan",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="mx-auto px-6 wrapper text-black mt-16 mb-8 max-w-6xl">
      <h2 className="mdtext-2xl text-xl font-bold text-center">
        What Our Happy Customers Say
      </h2>

      <div className="w-full mt-8">
        <Carousel>
          <CarouselContent className="gap-0">
            {users.map((u) => (
              <CarouselItem
                key={u.id}
                className="basis-auto flex justify-center"
              >
                <div className="bg-slate-100 rounded-lg shadow-md p-6 text-center h-full flex flex-col justify-center w-full max-w-[12rem]">
                  <h3 className="text-lg font-semibold">{u.user}</h3>{" "}
                  <p className="text-slate-600 text-sm mb-3">- {u.plan} -</p>
                  <p className="text-gray-600 text-sm mb-2">{u.message}</p>
                  <p className="text-yellow-500 text-sm">
                    {"★".repeat(u.rating)}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex-center mt-8 mb-8">
        <TestimonialForm />
      </div>
    </div>
  );
};

export default Testimonials;
