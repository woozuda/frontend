"use client";

import { useNotification } from "@/app/hooks/useNotification";

export default function NotificationDemo() {
  const { subscription, isSupported, onSubscribe } = useNotification();

  const sendNotification = async () => {
    await fetch("/api/web-push/notification", {
      method: "POST",
      body: JSON.stringify({
        title: "Test",
        message: "Test notification",
        subscription,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  };
  return (
    <div>
      {!subscription && (
        <button onClick={() => onSubscribe()}>Subscribe</button>
      )}
      {subscription && <button onClick={() => sendNotification()}>Send</button>}
    </div>
  );
}
