import { personalizeSchema, subscriptionSchema } from "@/lib/validators";
import { z } from "zod";

export type Personalize = z.infer<typeof personalizeSchema>;

export type Subscription = z.infer<typeof subscriptionSchema>;
