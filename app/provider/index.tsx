import { PropsWithChildren } from "react";
import { NotificationProvider } from "../notification/Provider";
import QueryProvider from "../query/Provider";
import { CounterStoreProvider } from "../stores/counter/Provider";

const AppProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <QueryProvider>
      <NotificationProvider>
        <CounterStoreProvider>{children}</CounterStoreProvider>
      </NotificationProvider>
    </QueryProvider>
  );
};

export default AppProvider;
