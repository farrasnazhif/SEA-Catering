"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpUser } from "@/lib/actions/user.action";
import { signUpDefaultValues } from "@/lib/constants";

import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUnButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full p-5" variant="default">
        {pending ? "Creating..." : "Create Account"}
      </Button>
    );
  };

  return (
    <form action={action}>
      {/* <input type="hidden" name="callbackUrl" value={callbackUrl} /> */}

      <div className="space-y-6 md:w-[20rem]">
        <div>
          <Input
            id="name"
            name="name"
            type="name"
            className="p-5"
            placeholder="Fullname"
            required
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
          {data?.errors?.name && (
            <p className="text-sm text-center text-red-500 mt-2 space-y-0">
              {data.errors.name}
            </p>
          )}
        </div>

        <div>
          <Input
            id="email"
            name="email"
            type="email"
            className="p-5"
            placeholder="Email Address"
            required
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
          {data?.errors?.email && (
            <p className="text-sm text-center text-red-500 mt-2">
              {data.errors.email}
            </p>
          )}
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
            defaultValue={signUpDefaultValues.password}
          />
          {data?.errors?.password && (
            <p className="text-sm text-center text-red-500 mt-2">
              {data.errors.password}
            </p>
          )}
        </div>

        <div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="p-5"
            required
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
          />
          {data?.errors?.confirmPassword && (
            <p className="text-sm text-center text-red-500 mt-2">
              {data.errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <SignUnButton />
        </div>

        {data && !data.success && (
          <div className="text-sm text-center text-red-500">{data.message}</div>
        )}

        <div className="text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            target="_self"
            className="link text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
