"use client";
import { getIdParams } from "@/utils/Protectedpage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRouting = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const protecte = getIdParams();
  const ProtectedPages = protecte?.ProtectedRoutes;
  const UnprotectedPages = protecte?.UnprotectedRoutes;
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      if (ProtectedPages && !ProtectedPages?.includes(pathname)) {
        router?.replace(ProtectedPages[0]);
      }
    } else {
      if (UnprotectedPages && !UnprotectedPages?.includes(pathname)) {
        router?.replace(UnprotectedPages[0]);
      }
    }
  }, [pathname, router, session, status, ProtectedPages, UnprotectedPages]);

  return null;
};

export default ProtectedRouting;
