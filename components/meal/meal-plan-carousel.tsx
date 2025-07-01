import { CheckCheck } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/auth";

const plans = [
  {
    id: 1,
    img: "/images/meal-plan/diet-plan.jpg",
    title: "Diet Plan",
    subtitle:
      "A low-calorie, balanced meal plan for healthy weight management—nutritious, filling, and delicious.",
  },
  {
    id: 2,
    img: "/images/meal-plan/protein-plan.jpg",
    title: "Protein Plan",
    subtitle:
      "High-protein meals to support muscle growth and energy—ideal for active and fitness-focused lifestyles.",
  },
  {
    id: 3,
    img: "/images/meal-plan/royal-plan.jpg",
    title: "Royal Plan",
    subtitle:
      "Premium, chef-inspired meals with rich flavors and variety—crafted for a luxurious dining experience.",
  },
];

const MealPlanCarousel = async () => {
  const session = await auth();

  return (
    <div className="mx-auto px-6 relative wrapper text-black mt-8 mb-8">
      <div className="flex flex-col lg:flex-row items-start gap-6 max-w-5xl mx-auto">
        {/* left */}
        <div className="lg:w-1/2 w-full">
          <Carousel>
            <CarouselContent>
              {plans.map((p) => (
                <CarouselItem key={p.id} className="basis-4/5 md:basis-full">
                  <Image
                    src={p.img}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover "
                    alt={`Food ${p.id}`}
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="hidden sm:flex right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>

        {/* right */}
        <div className="lg:w-1/2 w-full space-y-3 px-4">
          <h2 className="text-2xl font-bold mt-6 text-center">
            Daily Meals, Made Easy
          </h2>
          {plans.map(({ id, title, subtitle }) => (
            <div key={id}>
              <div className="flex-start mb-2 gap-2">
                <CheckCheck className="w-4 h-4" />
                <h3 className="text-md font-semibold ">{title}</h3>
              </div>

              <p className="text-gray-700 text-sm">{subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-center mt-8">
        <Button asChild className="text-lg p-6 font-semibold">
          {session ? (
            <Link href="/subscription">Choose Your Plan</Link>
          ) : (
            <Link href="/sign-in">Choose Your Plan</Link>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MealPlanCarousel;
