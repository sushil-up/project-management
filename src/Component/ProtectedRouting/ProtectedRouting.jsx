"use client";
import UserContext from "@/context/UserContext";
import { ProtectedRoutes, UnprotectedRoutes } from "@/utils/Protectedpage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ProtectedRouting = ({ children }) => {
  const { data: session, status } = useSession();
  const {id,setId}= useContext(UserContext)
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
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
