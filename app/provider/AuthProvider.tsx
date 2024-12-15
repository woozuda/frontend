"use client";

import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useHttp } from "../contexts/http";

const AuthProvider = (props: PropsWithChildren) => {
  const http = useHttp();
  const pathname = usePathname();
  http.baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
  const {
    data: ok,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["AUTHORIZATION"],
    queryFn: async () => {
      const response = await http.get("api/diary", { credentials: "include" });
      return response.ok;
    },
  });

  if (isFetching) {
    return null;
  }

  if (pathname.includes("auth") && ok) {
    return redirect("/");
  }
  if (pathname.includes("auth") && !ok) {
    return props.children;
  }
  if (!pathname.includes("auth") && ok) {
    return props.children;
  }
  if (!pathname.includes("auth") && !ok) {
    return redirect("/auth");
  }

  return null;
};

export { AuthProvider };
