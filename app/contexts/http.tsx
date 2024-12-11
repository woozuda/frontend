"use client";

import { Http } from "@/app/lib/http";
import { createContext, PropsWithChildren, useContext } from "react";

const HttpContext = createContext<Http>(null!);

export const HttpProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const http = new Http({
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }

  return <HttpContext.Provider value={http}>{children}</HttpContext.Provider>;
};

export const useHttp = () => {
  const http = useContext(HttpContext);

  return http;
};
