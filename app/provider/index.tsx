import { PropsWithChildren } from "react";
import { HttpProvider } from "../contexts/http";
import { NotificationProvider } from "../notification/Provider";
import QueryProvider from "../query/Provider";
import { CounterStoreProvider } from "../stores/counter/Provider";

const AppProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <HttpProvider>
      <QueryProvider>
        <NotificationProvider>
          <CounterStoreProvider>{children}</CounterStoreProvider>
        </NotificationProvider>
      </QueryProvider>
    </HttpProvider>
  );
};

export default AppProvider;
