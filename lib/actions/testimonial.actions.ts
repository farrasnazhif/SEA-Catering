import { z } from "zod";
import { insertTestimonialSchema } from "../validators";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function createUpdateTestimonial(
  data: z.infer<typeof insertTestimonialSchema>
) {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    //validate & store the testimonial
    const testimonial = insertTestimonialSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    //get product is being reviewed
    const product = await prisma.product.findFirst({
      where: { id: testimonial.productId },
    });

    if (!product) throw new Error("Product not found");

    //check if user already reviewed
    const testimonialExists = await prisma.testimonial.findFirst({
      where: {
        productId: testimonial.productId,
        userId: testimonial.userId,
      },
    });

    //processing the review
    await prisma.$transaction(async (tx) => {
      if (testimonialExists) {
        //update review
        await tx.testimonial.update({
          where: { id: testimonialExists.id },
          data: {
            description: testimonial.description,
            rating: testimonial.rating,
          },
        });
      } else {
        //create testimonial
        await tx.testimonial.create({ data: testimonial });
      }

      //get avg rating
      const avgRating = await tx.testimonial.aggregate({
        _avg: { rating: true },
        where: { productId: testimonial.productId },
      });

      //get number of testimonials
      const numTestimonials = await tx.testimonial.count({
        where: { productId: testimonial.productId },
      });

      //update the rating and numtestimonials in product table
      await tx.product.update({
        where: { id: testimonial.productId },
        data: {
          rating: avgRating._avg.rating || 0,
          numTestimonials: numTestimonials,
        },
      });
    });

    return { success: true, message: "Review created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
