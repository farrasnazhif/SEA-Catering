import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminOverviewPage = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") redirect("/");

  return (
    <div>
      <div>Admin Overview</div>
    </div>
  );
};

export default AdminOverviewPage;
