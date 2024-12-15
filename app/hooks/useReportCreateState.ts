import { useMutationState } from "@tanstack/react-query";
import { RetrospectEnums } from "../models/report";
import { CreateReportProps } from "./useReportCreate";

export interface UseReportCreateStateProps {
  type?: "DIARY" | RetrospectEnums;
}

const useReportCreateState = (props: UseReportCreateStateProps) => {
  const { type } = props;
  const mutationState = useMutationState({
    filters: {
      mutationKey: ["REPORT_CREATE"],
    },
  });

  return mutationState.filter(
    (state) =>
      (state.variables as CreateReportProps).type === type &&
      state.status === "pending"
  );
};

export default useReportCreateState;
