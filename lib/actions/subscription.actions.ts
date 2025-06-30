"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

export async function getMyPlan() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not logged in");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscription: true,
    },
  });

  if (!user) throw new Error("User not found");

  const subscriptions = user.subscription as {
    mealPlan: string;
    price: number;
    mealTypes: string[];
    deliveryDays: string[];
  }[];

  return subscriptions;
}
