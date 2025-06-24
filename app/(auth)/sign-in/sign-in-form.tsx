"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithCredentials } from "@/lib/actions/user.action";

import { signInDefaultValues } from "@/lib/constants";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full p-5" variant="default">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6 ">
        <div className="w-[24rem]">
          <Input
            id="email"
            name="email"
            type="email"
            className="p-5"
            placeholder="Email"
            required
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Input
            id="password"
            name="password"
            type="password"
            className="p-5"
            placeholder="Password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            target="_self"
            className="link text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
