"use client";
import { useSession } from "next-auth/react";
import React from "react";

const AdminPanel = ({ children }) => {
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
