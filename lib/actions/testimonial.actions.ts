"use server";

import { insertTestimonialSchema } from "../validators";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export const createUpdateTestimonial = async (values: any) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const validated = insertTestimonialSchema.parse(values);

    await prisma.testimonial.create({
      data: {
        userId: session.user.id,
        productId: validated.productId,
        rating: validated.rating,
        description: validated.description,
      },
    });

    return { success: true, message: "Submitted" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const getAllTestimonials = async () => {
  return await prisma.testimonial.findMany({
    include: {
      user: true,
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
