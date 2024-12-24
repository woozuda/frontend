import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";
import { Http, HttpLibs } from "./http";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    EVENT_SOURCE: EventSource | undefined | null;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();

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
  event: ExtendableEvent,
  title: string,
  body: string
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
  event.waitUntil(self.registration.showNotification(title, options));
}

self.addEventListener("activate", function (event) {
  if (self.EVENT_SOURCE) {
    self.EVENT_SOURCE.close();
    self.EVENT_SOURCE = null;
  }
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/alarm/connect`;
  self.EVENT_SOURCE = new EventSource(url, { withCredentials: true });
  self.EVENT_SOURCE.onopen = function (event) {};
  self.EVENT_SOURCE.onmessage = function (sse) {
    createSWHttp()
      .get("/api/my/alarm")
      .then((resp) => HttpLibs.toJson<{ alarm: "on" | "off" }>(resp))
      .then((data) => {
        if (data.alarm === "on") {
          const title = "레포트 분석 가능";
          const body = sse.data as string;
          createNotification(event, title, body);
        }
      });
  };
  self.onerror = function (event) {
    self.EVENT_SOURCE?.close();
  };
});

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/assets/icons/icon-180x180.png",
      badge: "/favicon.ico",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow("/report").then((client) => {
      client?.navigate("/report");
    })
  );
});
