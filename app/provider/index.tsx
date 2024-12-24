import { PropsWithChildren } from "react";
import { HttpProvider } from "../contexts/http";
import { NotificationProvider } from "../notification/Provider";
import QueryProvider from "../query/Provider";
import { CounterStoreProvider } from "../stores/counter/Provider";
import { AuthProvider } from "./AuthProvider";
import SSEProvider from "./SSEProvider";

const AppProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <HttpProvider>
      <QueryProvider>
        <AuthProvider>
          <NotificationProvider>
            <SSEProvider
              url={`${process.env.NEXT_PUBLIC_BASE_URL}/api/alarm/connect`}
            >
              <CounterStoreProvider>{children}</CounterStoreProvider>
            </SSEProvider>
          </NotificationProvider>
        </AuthProvider>
      </QueryProvider>
    </HttpProvider>
  );
};

export default AppProvider;
