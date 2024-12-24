"use client";

import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";
import { useHttp } from "../contexts/http";

export default function Page() {
  const http = useHttp();
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    }
    http
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/alarm/connect/test`)
      .catch(console.error);
  };
  return (
    <div>
      <Button onClick={onClick}>알림 실험</Button>
    </div>
  );
}
