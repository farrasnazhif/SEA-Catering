This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

**First, you need to install dependencies and set your env configuration:**

1. Install dependencies by running ```npm install``` on your terminal.

2. Set your env configuration by creating `.env` file. Make sure you don't create the file inside the `app` directory.
- Copy this to your `.env` file. Besides `http://localhost:3000`, Don't forget to change all the dependencies inside it,
  
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
  - you can get the `DATABASE_URL` from [`vercel website`](https://vercel.com/). Sign your account to vercel and go to the storage navigation. In storage section, you will see neon         database and you will get the `DATABASE_URL` after you create the neon database.
  - for `NEXTAUTH_SECRET`, just run this command `openssl rand -base64 32` and the url will appear on your terminal. Make sure you already run `npm install`.

**After the first step settled, run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
