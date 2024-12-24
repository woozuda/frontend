"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NotificationLibs } from "../lib/notification.browser";

export interface NotificationContext {
  isSupported: boolean;
  subscription: PushSubscription | null;
  setSubscription: Dispatch<SetStateAction<PushSubscription | null>>;
  onSubscribe: () => unknown;
}

export const Context = createContext<NotificationContext>(null!);

export const NotificationProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if (NotificationLibs.checkIsNotificationSupported()) {
      setIsSupported(true);
      if (NotificationLibs.checkPermission()) {
        NotificationLibs.subscribe((sub) => {
          setSubscription(sub);
        });
      }
    }
  }, []);

  const onSubscribe = useCallback(() => {
    NotificationLibs.subscribe((subs) => {
      if (subs) {
        setSubscription(subs);
      }
    });
  }, []);

  useEffect(() => {
    onSubscribe();
  }, [onSubscribe]);

  return (
    <Context.Provider
      value={{
        isSupported,
        subscription,
        setSubscription,
        onSubscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
};
