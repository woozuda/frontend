import { useContext } from "react";
import { Context as NotificationContext } from "../notification/Provider";

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider."
    );
  }
  return context;
};
