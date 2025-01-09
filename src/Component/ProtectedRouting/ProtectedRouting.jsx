"use client";

import UserContext from "@/context/UserContext";
import { ProtectedRoutes, UnprotectedRoutes } from "@/utils/Protectedpage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ProtectedRouting = ({ children }) => {
  const { data: session, status } = useSession();
  const { id } = useContext(UserContext); // Ensure `id` is properly initialized in UserContext
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (session) {
      const protectedRoutes = ProtectedRoutes(id);
      const protectedPaths = Object.values(protectedRoutes); // Extract route paths
      if (protectedPaths && !protectedPaths.includes(pathname)) {
        // Redirect to the first protected route
        router.replace(protectedPaths[0]);
      }
    } else {
      if (UnprotectedRoutes && !UnprotectedRoutes.includes(pathname)) {
        // Redirect to the first unprotected route
        router.replace(UnprotectedRoutes[0]);
      }
    }
  }, [pathname, router, session, status, id]);

  return <>{children}</>;
};

export default ProtectedRouting;
