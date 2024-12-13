"use client";

import { redirect, usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { useHttp } from "../contexts/http";

const AuthProvider = (props: PropsWithChildren) => {
  const http = useHttp();
  const pathname = usePathname();
  http.baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
  const [status, setStatus] = useState({ ok: false, isLoading: true });
  useEffect(() => {
    http
      .get("api/diary", { credentials: "include" })
      .then((response) => {
        setStatus(() => ({ ok: response.ok, isLoading: false }));
      })
      .catch(() => {
        setStatus(() => ({ ok: false, isLoading: false }));
      });
  }, [http]);

  if (pathname.includes("auth")) {
    return props.children;
  }

  if (status.isLoading) {
    return null;
  }
  if (!status.ok) {
    redirect("/auth");
  }
  return props.children;
};

export { AuthProvider };
