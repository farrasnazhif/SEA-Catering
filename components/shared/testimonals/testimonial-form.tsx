"use client";

import { useSession } from "next-auth/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { insertTestimonialSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdateTestimonial } from "@/lib/actions/testimonial.actions";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon } from "lucide-react";

type Props = {
  products: { id: string; name: string }[];
};

const TestimonialForm = ({ products }: Props) => {
  const { data: session } = useSession();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof insertTestimonialSchema>>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      productId: "",
      description: "",
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof insertTestimonialSchema>
  > = async (values) => {
    const res = await createUpdateTestimonial(values);

    if (!res.success) {
      toast.error(getErrorMessage(res.message));
      return;
    }

    toast.success("Review submitted successfully");
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {session && (
          <Button className="text-lg p-6 font-semibold">Add Your Rating</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mb-8">
            <DialogTitle>Write a review</DialogTitle>
            <DialogDescription>
              Share your thoughts with other customers
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Select Product */}
            <div className="grid gap-3">
              <Label>Select Product</Label>
              <Controller
                control={control}
                name="productId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productId && (
                <p className="text-red-500 text-sm">
                  {errors.productId.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label>Description</Label>
              <Input
                {...register("description")}
                placeholder="Write your review..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="grid gap-3">
              <Label>Rating</Label>
              <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          <div className="flex items-center gap-2">
                            {num}
                            <StarIcon
                              className="inline h-4 w-4"
                              fill="yellow"
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
