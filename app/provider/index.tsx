import { PropsWithChildren } from "react";
import QueryProvider from "../query/Provider";
import { CounterStoreProvider } from "../stores/counter/Provider";

const AppProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <QueryProvider>
      <CounterStoreProvider>{children}</CounterStoreProvider>
    </QueryProvider>
  );
};

export default AppProvider;
