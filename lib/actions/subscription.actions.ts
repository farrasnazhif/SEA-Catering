"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

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
    createdAt: string;
    finishedAt: string;
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

export const getAllSubscriptions = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      subscription: true,
    },
  });

  const result = users.flatMap((user) =>
    (user.subscription as any[]).map((sub, index) => ({
      id: `${user.id}-${index}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      createdAt: sub.createdAt || null,
      finishedAt: sub.finishedAt || null,
      mealPlan: sub.mealPlan,
      price: sub.price,
      mealTypes: sub.mealTypes,
      deliveryDays: sub.deliveryDays,
      isPaid: false,
      isDelivered: false,
    }))
  );

  result.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  return result;
};

export const deleteSubscriptionByUser = async (
  userId: string,
  index: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscription: true },
    });

    if (!user || !user.subscription) {
      return { success: false, message: "User or subscriptions not found" };
    }

    const subscriptions = user.subscription as any[];

    if (index < 0 || index >= subscriptions.length) {
      return { success: false, message: "Invalid subscription index" };
    }

    // Remove subscription at the given index
    const updatedSubscriptions = subscriptions.filter((_, i) => i !== index);

    await prisma.user.update({
      where: { id: userId },
      data: { subscription: updatedSubscriptions },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return { success: false, message: "Internal server error" };
  }
};
