import {
  insertTestimonialSchema,
  personalizeSchema,
  subscriptionSchema,
} from "@/lib/validators";
import { z } from "zod";

export type Personalize = z.infer<typeof personalizeSchema>;

export type Subscription = z.infer<typeof subscriptionSchema>;

export type Testimonial = z.infer<typeof insertTestimonialSchema>;
