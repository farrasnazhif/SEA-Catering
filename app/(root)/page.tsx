import Hero from "@/components/hero";
import MealPlanCarousel from "@/components/meal/meal-plan-carousel";
import Testimonials from "@/components/shared/testimonals";

export default function Home() {
  return (
    <>
      {/* <main>Landing Page</main> */}
      <Hero />
      <MealPlanCarousel />
      <Testimonials />
    </>
  );
}
