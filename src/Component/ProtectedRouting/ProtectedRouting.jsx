"use client";
import { AllPages } from "@/utils/pagesurl";
import { ProtectedRoutes, UnprotectedRoutes } from "@/utils/Protectedpage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRouting = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      const id = localStorage.getItem("id");
      const ProtectedPages = ProtectedRoutes(id);
      if (
        ProtectedPages &&
        !Object.values(ProtectedPages)?.includes(pathname)
      ) {
        router?.replace(ProtectedPages[0]);
      }
    } else {
      if (UnprotectedRoutes && !UnprotectedRoutes?.includes(pathname)) {
        router?.replace(UnprotectedRoutes[0]);
      }
    }
  }, [pathname, router, session, status, ProtectedRoutes, UnprotectedRoutes]);
  return <>{children}</>;
};

export default ProtectedRouting;
