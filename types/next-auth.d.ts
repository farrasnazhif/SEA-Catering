import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      phone?: string | null;
      address?: any;
      allergies?: string[] | [];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    phone?: string | null;
    address?: any;
    allergies?: string[] | [];
  }
}
