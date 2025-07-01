import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const personalizeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
  phone: z.string().min(8, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  allergies: z.array(z.string()),
});

export const subscriptionSchema = z.object({
  mealPlan: z.string().min(1, "Meal plan is required"),
  price: z.coerce.number().min(1, "Price is required"),
  mealTypes: z.array(z.string()).min(1, "Meal types is required"),
  deliveryDays: z.array(z.string()).min(1, "Delivery days is required"),
  createdAt: z.string().optional(),
  finishedAt: z.string().optional(),
});

export const insertTestimonialSchema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters"),
  productId: z.string().min(1, "Product is required"),
  userId: z.string().min(1, "User is required"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});
