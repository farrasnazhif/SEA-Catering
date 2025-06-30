export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SEA Catering";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Healthy Meals, Anytime, Anywhere";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(",")
  : ["admin", "user"];

export const subscriptionDefaultValues = {
  mealPlan: "",
  price: 0,
  mealTypes: [],
  deliveryDays: [],
  createdAt: "",
  finishedAt: "",
};
