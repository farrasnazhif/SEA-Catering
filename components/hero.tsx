import { CheckCheck } from "lucide-react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import PricingPlanButton from "./ui/pricing-plan-button";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

const specialities = [
  {
    id: 1,
    img: "/images/image-1.jpg",
    title: "Easy Prep",
    subtitle:
      "Get delicious dinners on the table in no time with easy-to-follow recipes and pre-portioned ingredients.",
  },
  {
    id: 2,
    img: "/images/image-2.jpg",
    title: "Wide Variety",
    subtitle:
      "Don’t get stuck in a dinner routine. Treat your tastebuds to chef-curated recipes every week, with options for every lifestyle.",
  },
  {
    id: 3,
    img: "/images/image-3.jpg",
    title: "Super Convenient",
    subtitle:
      "Skip the grocery trip and get dinner recipes delivered right to your doorstep, so you can cook when it fits your schedule. Plus, pause or cancel any time!",
  },
];

const Hero = () => {
  return (
    <>
      <section className="bg-cover bg-center text-white p-8 relative overflow-hidden bg-slate-100 ">
        <div
          className="md:absolute inset-0 bg-cover bg-center scale-x-[-1]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvb2R8ZW58MHx8MHx8fDA%3D')`,
          }}
        />

        <div className=" mx-auto px-6 relative flex-start wrapper text-black">
          <div className="md:w-2/3 w-full flex flex-col gap-10">
            <h1
              className={`${anton.className} md:text-7xl text-5xl md:text-start text-center font-bold uppercase`}
            >
              customize your meal with{" "}
              <span className="text-red-500 ">SEA Catering.</span>
            </h1>

            <ul className="space-y-2 font-semibold ">
              <li className="md:flex-start flex-center gap-3">
                <CheckCheck />
                Customizable meal
              </li>
              <li className="md:flex-start flex-center gap-3">
                <CheckCheck />
                delivery to major cities
              </li>
              <li className="md:flex-start flex-center gap-3">
                <CheckCheck />
                detailed nutritional information
              </li>
            </ul>

            <div className="md:flex-start flex-center">
              <PricingPlanButton />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className=" mx-auto px-6 relative z-10 wrapper text-black mt-12">
          <div className="w-full flex flex-center flex-col gap-8">
            <h1 className="text-2xl  font-bold flex-center text-center">
              Healthy Meals, Anytime, Anywhere
            </h1>

            <div className="flex flex-wrap justify-center gap-12">
              {specialities.map((s) => (
                <div key={s.id} className="w-[300px] overflow-hidden ">
                  <Image
                    src={s.img}
                    width={300}
                    height={200}
                    className="object-cover w-full h-[200px]"
                    alt={`Food ${s.id}`}
                  />
                  <div className="pt-4 px-4">
                    <h3 className="text-xl text-center font-semibold mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-center text-gray-600">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <PricingPlanButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
