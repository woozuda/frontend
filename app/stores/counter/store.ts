import { createStore } from "zustand";

export type CounterState = {
  value: number;
};

export type CounterActions = {
  increment: () => unknown;
  decrement: () => unknown;
};

export type CounterStore = CounterState & CounterActions;

export const fallbackInitialState: CounterState = {
  value: 0,
};

export const createCounterStore = (
  initialState: CounterState = fallbackInitialState
) => {
  return createStore<CounterStore>((set) => ({
    ...initialState,
    increment: () => set((state) => ({ value: state.value + 1 })),
    decrement: () => set((state) => ({ value: state.value - 1 })),
  }));
};
