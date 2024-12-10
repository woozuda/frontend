import { NotificationServerLibs } from "@/app/lib/notification.server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { subscription, title, message } = await req.json();

  NotificationServerLibs.sendNotification(subscription, title, message);
  return new Response(JSON.stringify({ message: "Notification." }));
}
