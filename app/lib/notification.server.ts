import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:example@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? ""
);

export class NotificationServerLibs {
  static async sendNotification(
    subscription: webpush.PushSubscription,
    title: string,
    message: string
  ) {
    const payload = {
      title,
      body: message,
      icon: "/assets/icons/icon-96x96.png",
      url: "/",
    };

    await webpush.sendNotification(subscription, JSON.stringify(payload));
  }
}
