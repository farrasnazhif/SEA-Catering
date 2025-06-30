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

// Format date and times (indonesia)
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: "Asia/Jakarta", // waktu Indonesia (WIB)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
    timeZone: "Asia/Jakarta", // waktu Indonesia (WIB)
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: "Asia/Jakarta", // waktu Indonesia (WIB)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-ID",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-ID",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-ID",
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
