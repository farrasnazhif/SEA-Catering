"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { personalizeSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserPersonalize } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getErrorMessage } from "@/lib/utils";

const allergies = ["Dairy", "Gluten", "Peanuts", "Chicken", "Beef", "Pork"];

const PersonalizeForm = () => {
  const [customAllergy, setCustomAllergy] = useState("");

  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof personalizeSchema>>({
    resolver: zodResolver(personalizeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      allergies: [],
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        phone: session.user.phone ?? "",
        address: session.user.address ?? "",
        allergies: session.user.allergies ?? [],
      });
    }
  }, [session?.user, form]);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof personalizeSchema>) => {
    startTransition(async () => {
      const res = await updateUserPersonalize(values);

      if (!res.success) {
        toast.error(getErrorMessage(res?.message));
        return;
      }

      const newSession = {
        ...session,
        user: {
          ...session?.user,
          name: values.name,
          phone: values.phone,
          address: values.address,
          allergies: values.allergies,
        },
      };

      await update(newSession);

      router.push("/subscription");
    });
  };

  return (
    <div className="mx-auto px-6 wrapper text-black mt-8 mb-12 max-w-3xl">
      <div className="flex-col flex-center gap-6">
        <div className="text-center">
          <h2 className="h3-bold">Let’s Personalize Your Meals</h2>
        </div>

        <Form {...form}>
          <form
            method="post"
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border border-slate-400"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        className="border border-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        type="tel"
                        className="border border-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your delivery address"
                        className="border border-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies or Restrictions</FormLabel>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {allergies.map((item) => (
                      <Label
                        key={item}
                        className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent/50 cursor-pointer border-slate-400"
                      >
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, item]
                              : field.value.filter((val) => val !== item);
                            field.onChange(newValue);
                          }}
                        />
                        <span className="text-sm">{item}</span>
                      </Label>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={customAllergy}
                      onChange={(e) => setCustomAllergy(e.target.value)}
                      placeholder="Add others"
                      className="border border-slate-400 p-5"
                    />
                    <Button
                      type="button"
                      className="p-5"
                      onClick={() => {
                        const trimmed = customAllergy.trim();
                        if (trimmed && !field.value.includes(trimmed)) {
                          field.onChange([...field.value, trimmed]);
                        }
                        setCustomAllergy("");
                      }}
                    >
                      Add
                    </Button>
                  </div>

                  {field.value?.length > 0 && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Selected Restrictions:</p>
                      <div className="flex justify-center flex-wrap gap-2">
                        {field.value.map((a, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2"
                          >
                            {a}
                            <button
                              type="button"
                              className="ml-1 text-blue-500 hover:text-red-500"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((val) => val !== a)
                                )
                              }
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div className="mt-6">
              <Button
                type="submit"
                className="gap-2"
                disabled={form.formState.isSubmitting}
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalizeForm;
