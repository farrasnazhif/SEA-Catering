import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormErrorObject = {
  message: string;
  errors?: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): FormErrorObject {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};

    error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      message: "Failed. Try Again.",
      errors: fieldErrors,
    };
  }

  if (
    error?.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target?.[0] ?? "Field";
    return {
      message: `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`,
      errors: {
        [field]: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`,
      },
    };
  }

  const msg =
    typeof error?.message === "string"
      ? error.message
      : JSON.stringify(error?.message ?? "Unknown error");

  return { message: msg };
}

export function getErrorMessage(msg: string | { message: string }): string {
  return typeof msg === "string" ? msg : msg.message;
}
