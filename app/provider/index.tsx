import { PropsWithChildren } from "react";
import { HttpProvider } from "../contexts/http";
import { NotificationProvider } from "../notification/Provider";
import QueryProvider from "../query/Provider";
import { CounterStoreProvider } from "../stores/counter/Provider";
import { AuthProvider } from "./AuthProvider";

const AppProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <HttpProvider>
      <QueryProvider>
        <AuthProvider>
          <NotificationProvider>
            <CounterStoreProvider>{children}</CounterStoreProvider>
          </NotificationProvider>
        </AuthProvider>
      </QueryProvider>
    </HttpProvider>
  );
};

export default AppProvider;
