"use client";

import { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

import getQueryClient from "@/app/query/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export interface LayoutProps extends PropsWithChildren {
  params: Promise<{ id: number }>;
}

export default function Layout(props: LayoutProps) {
  const { children, params } = props;
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      <Toaster />
    </HydrationBoundary>
  );
}
