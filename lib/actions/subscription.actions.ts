"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

export async function getMySubscription() {
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

export async function deleteSubscriptionByIndex(index: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not authenticated");

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subs = user.subscription as any[];
  if (!Array.isArray(subs)) throw new Error("Invalid subscription data");

  const newSubs = subs.filter((_, i) => i !== index);

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscription: newSubs,
    },
  });

  return { success: true };
}
