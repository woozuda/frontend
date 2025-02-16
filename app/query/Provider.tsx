"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "./client";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
