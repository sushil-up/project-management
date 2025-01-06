"use client";
// import { routesUrl } from "@/utils/pagesurl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const AdminPanel = ({ children }) => {
  const router= useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routesUrl.signIn);
    },
  });

  if (!session) return <p>Loading...</p>;

  return <>{children}</>;
};

export default AdminPanel;
