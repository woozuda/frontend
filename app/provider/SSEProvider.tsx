"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { Http, HttpLibs } from "../lib/http";

function createSWHttp() {
  const http = new Http({
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }
  return http;
}

function createNotification(
  title: string,
  body: string,
  onClick?: () => unknown
) {
  const options = {
    body,
    icon: "/assets/icons/icon-180x180.png",
    badge: "/assets/icons/icon-180x180.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
  };
  const noti = new Notification(title, options);
  noti.onclick = function () {
    noti.close();
    noti.onclick = null;
    onClick?.();
  };
}

export interface SSEProviderProps extends PropsWithChildren {
  url?: string;
}

const SSEProvider = (props: SSEProviderProps) => {
  const { url, children } = props;

  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/report");
  }, [router]);

  useEffect(() => {
    if (!url) {
      return;
    }
    const source = new EventSource(url, { withCredentials: true });
    source.onopen = function (event) {};
    source.onmessage = function (sse) {
      createSWHttp()
        .get("/api/my/alarm")
        .then((resp) => HttpLibs.toJson<{ alarm: "on" | "off" }>(resp))
        .then((data) => {
          if (data.alarm === "on") {
            const title = "레포트 분석 가능";
            const body = sse.data as string;
            createNotification(title, body, onClick);
          }
        });
    };
    self.onerror = function (event) {
      source.close();
    };
  }, [url, onClick]);

  return children;
};

export default SSEProvider;
