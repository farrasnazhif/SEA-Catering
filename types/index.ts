import {
  insertOrderItemSchema,
  insertOrderSchema,
  personalizeSchema,
} from "@/lib/validators";
import { z } from "zod";

export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  deliveryDays: string[];
  mealTypes: string[];
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };
};

export type Personalize = z.infer<typeof personalizeSchema>;
