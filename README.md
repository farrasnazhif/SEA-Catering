This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### First, you need to install dependencies and set your env configuration:

1. Install dependencies by running ```npm install``` on your terminal.

2. Set your env configuration by creating `.env` file. Make sure you don't create the file inside the `app` directory.
- This is how you will set you `.env` file.
```c
NEXT_PUBLIC_APP_NAME=<yourappname>
NEXT_PUBLIC_APP_DESCRIPTION=<yourappdescription>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

DATABASE_URL=<neondatabaseurl>

NEXTAUTH_SECRET=<nextauthssl>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

#### How can i get the `DATABASE_URL` and `NEXTAUTH_SECRET` ?
  - you can get the `DATABASE_URL` from [`vercel website`](https://vercel.com/). Sign your account to vercel and go to the storage navigation. In storage section, you will see neon         database and you will get the `DATABASE_URL` after you create the neon database.
  - for `NEXTAUTH_SECRET`, just run this command `openssl rand -base64 32` and the url will appear on your terminal. Make sure you already run `npm install`.

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
