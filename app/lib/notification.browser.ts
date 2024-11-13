export class NotificationLibs {
  static checkIsNotificationSupported() {
    let isSupported = false;
    if (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "showNotification" in ServiceWorkerRegistration.prototype
    ) {
      isSupported = true;
    }

    return isSupported;
  }

  static checkPermission() {
    const state = Notification.permission;
    if (state === "granted") {
      return true;
    }
    return false;
  }

  static async subscribe(
    onSubscribe: (subscription: PushSubscription | null) => unknown
  ) {
    try {
      const registration = await navigator.serviceWorker.ready;

      const response = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });
      onSubscribe(response);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error(error);
    }
  }
}
