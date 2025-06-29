import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: hashSync("12345678", 10),
      role: "admin",
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: hashSync("12345678", 10),
      role: "user",
    },
  ],
  products: [
    {
      name: "Diet Plan",
      slug: "diet-plan",

      images: ["/images/meal-plan/diet-plan.jpg"],
      description:
        "A low-calorie, balanced meal plan for healthy weight management—nutritious, filling, and delicious.",
      stock: 5,
      price: 30000,

      rating: 4.5,
      numReviews: 10,

      isFeatured: true,
      banner: "/images/meal-plan/diet-plan.jpg",
    },
    {
      name: "Protein Plan",
      slug: "protein-plan",

      images: ["/images/meal-plan/protein-plan.jpg"],
      description:
        "High-protein meals to support muscle growth and energy—ideal for active and fitness-focused lifestyles.",
      stock: 5,
      price: 40000,

      rating: 4.5,
      numReviews: 10,

      isFeatured: true,
      banner: "/images/meal-plan/protein-plan.jpg",
    },
    {
      name: "Royal Plan",
      slug: "royal-plan",

      images: ["/images/meal-plan/royal-plan.jpg"],
      description:
        "High-protein meals to support muscle growth and energy—ideal for active and fitness-focused lifestyles.",
      stock: 5,
      price: 60000,

      rating: 4.5,
      numReviews: 10,

      isFeatured: true,
      banner: "/images/meal-plan/royal-plan.jpg",
    },
  ],
};

export default sampleData;
