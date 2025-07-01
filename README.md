This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

**First, you need to install dependencies and set your env configuration:**

1. Install dependencies by running `npm install` on your terminal.

2. Set your env configuration by creating `.env` file. Make sure you don't create the file inside the `app` directory.

- Copy this to your `.env` file. Besides `http://localhost:3000`, Don't forget to change all the dependencies inside it.

```c
NEXT_PUBLIC_APP_NAME=<yourappname>
NEXT_PUBLIC_APP_DESCRIPTION=<yourappdescription>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

DATABASE_URL=<neondatabaseurl>

NEXTAUTH_SECRET=<nextauthssl>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

- How can i get the `DATABASE_URL` and `NEXTAUTH_SECRET` ?
  - you can get the `DATABASE_URL` from [`vercel website`](https://vercel.com/). Sign your account to vercel and go to the storage navigation. In storage section, you will see neon database and you will get the `DATABASE_URL` after you create the neon database.
  - for `NEXTAUTH_SECRET`, just run this command `openssl rand -base64 32` and the url will appear on your terminal. Make sure you already run `npm install`.

# Seeding Data to Database

- Here is how you can seed your data through code, it's useful when you want to create **admin user** and initialize data.

1. Make a file named `sample-data.ts` and `seed.ts` inside db folder.

2. **IMPORTANT**

- Before you seed the data, make sure you have your own database schema

- To make the database schema, run this command on your terminal
  - `npx prisma init`: you will perceive prisma folder.
  - In `schema.prisma` (inside prisma folder) you will have to create your own schema.
  - After you create the schema, run `npx prisma generate` to generate the schema
  - Finally, create the migration by running `npx prisma migrate dev --name (your migration name)`

3. Set your `sample-data.ts` file like this. In this example, i want to bring user and product data into the database.

```c
import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: hashSync("12345678", 10),
      role: "admin",
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: hashSync("12345678", 10),
      role: "user",
    },
  ],
  products: [
    {
      name: "Diet Plan",
      slug: "diet-plan",

      images: ["/images/meal-plan/diet-plan.jpg"],
      description:
        "A low-calorie, balanced meal plan for healthy weight management—nutritious, filling, and delicious.",
      stock: 5,
      price: 30000,

      rating: 4.5,
      numReviews: 10,

      isFeatured: true,
      banner: "/images/meal-plan/diet-plan.jpg",
    },
    {
      name: "Protein Plan",
      slug: "protein-plan",

      images: ["/images/meal-plan/protein-plan.jpg"],
      description:
        "High-protein meals to support muscle growth and energy—ideal for active and fitness-focused lifestyles.",
      stock: 5,
      price: 40000,

      rating: 4.5,
      numReviews: 10,

      isFeatured: true,
      banner: "/images/meal-plan/protein-plan.jpg",
    },
    {
      name: "Royal Plan",
      slug: "royal-plan",

      images: ["/images/meal-plan/royal-plan.jpg"],
      description:
        "High-protein meals to support muscle growth and energy—ideal for active and fitness-focused lifestyles.",
      stock: 5,
      price: 60000,

      rating: 4.5,
      numReviews: 10,

      isFeatured: true,
      banner: "/images/meal-plan/royal-plan.jpg",
    },
  ],
};

export default sampleData;
```

4. After that, seed the data into the database.

- Write this code in `seed.ts`.

```c
  import { PrismaClient } from "@prisma/client";
  import sampleData from "./sample-data";

  async function main() {
  const prisma = new PrismaClient();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully!");
}

main();
```

- To seed the data, run `npx tsx ./db/seed` on your terminal. Don't worry if you are asked to download typescript, just download it.

# View Database

- You can see your database by running `npx prisma studio` on your terminal.

# View Admin Page

- If you're curious with the admin page, you can sign in with one of my admin account.

```c
users: [
    {
      name: "John",
      email: "admin@example.com",
      password: "12345678",
      role: "admin",
    },
  ],
```

- You'll see admin option if you click your account avatar.
