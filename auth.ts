import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

import { compareSync } from "bcrypt-ts-edge";
// import { PrismaClient } from "@prisma/client";
import { authConfig } from "./auth.config";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        // Find user in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if the password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          // If password is correct, return the user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // If use doesn't exist or password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      // Set the user's ID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.phone = token.phone;
      session.user.address = token.address;
      session.user.allergies = token.allergies;

      // console.log(token);

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.allergies = token.allergies;
      }

      return session;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.address = user.address;
        token.allergies = user.allergies;

        // If user has no name, then use the email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // Update the database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      // Handle session updates
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
        token.phone = session.user.phone;
        token.address = session.user.address;
        token.allergies = session.user.allergies;
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
