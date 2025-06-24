import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.action";

import Link from "next/link";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button variant="default">
          <p className="text-sm font-medium ">Sign In</p>
        </Button>
      </Link>
    );
  }

  const firstName = session.user?.name?.split(" ")?.[0] ?? "User";
  const userImage = session.user?.image;

  return (
    <div className=" flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar>
            <AvatarImage src={userImage || ""} />
            <AvatarFallback className="bg-neutral-400 shadow-md text-black">
              {firstName.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" space-y-2 p-2">
          <div className="bg-slate-100 p-2 rounded-sm">
            <div className="text-sm font-medium">{session.user?.name}</div>
            <div className="text-sm text-muted-foreground">
              {session.user?.email}
            </div>
          </div>
          <Link
            href="/user/profile"
            className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
          >
            User Profile
          </Link>
          <Link
            href="/profile/plan"
            className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
          >
            My Plan
          </Link>
          {session.user?.role === "admin" && (
            <Link
              href="/admin/overview"
              className="block px-2 py-1 text-sm hover:bg-slate-50 rounded"
            >
              Admin
            </Link>
          )}
          <form action={signOutUser} className="w-full ">
            <Button
              type="submit"
              variant="default"
              className="w-full text-sm px-2 py-1 hover:bg-slate-700 block text-center"
            >
              Sign Out
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
