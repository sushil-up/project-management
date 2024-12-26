"use client";
import { ProtectedRoutes, UnprotectedRoutes } from "@/utils/Protectedpage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRouting = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  console.log(
    "ProtectedRoutes && !ProtectedRoutes.includes(pathname)",
    ProtectedRoutes && !ProtectedRoutes.includes(pathname)
  );
  console.log(
    "UnprotectedRoutes && !UnprotectedRoutes.includes(pathname)",
    UnprotectedRoutes && !UnprotectedRoutes.includes(pathname)
  );
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      if (ProtectedRoutes && !ProtectedRoutes.includes(pathname)) {
        router.replace(UnprotectedRoutes[0]);
      }
    } else {
      if (UnprotectedRoutes && !UnprotectedRoutes.includes(pathname)) {
        router.replace(ProtectedRoutes[0]);
      }
    }
  }, [pathname, router, session, status, ProtectedRoutes, UnprotectedRoutes]);

  return null;
};

export default ProtectedRouting;
