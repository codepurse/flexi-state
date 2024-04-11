import { useEffect, useReducer, useRef } from "react";
import { deepMerge, shallowEqual } from "./util/utils";

export const createStore = (initializeStore, middlewares = []) => {
  let state = initializeStore({});
  let listeners = new Set();
  let stateInitializer = initializeStore;

  const getState = () => {
    if (state === undefined) {
      state = stateInitializer(null);
      stateInitializer = null;
    }
    return state;
  };

  const setState = (newState) => {
    const updatedState = deepMerge(state, newState);
    if (shallowEqual(state, updatedState)) return;
    state = updatedState;
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const actions = {};
  for (const [key, action] of Object.entries(initializeStore(state))) {
    if (typeof action === "function") {
      actions[key] = (...args) => {
        const updater = action(...args);
        const newState = updater(state);
        setState(newState);
      };
    }
  }

  const useStore = (selector = getState) => {
    const stateRef = useRef(selector(state)); // Initialize with initial state
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
      const listener = (newState) => {
        const selectedState = selector(newState);
        if (stateRef.current !== selectedState) {
          stateRef.current = selectedState;
          forceUpdate();
        }
      };

      const unsubscribe = subscribe(listener);
      return () => {
        unsubscribe();
      };
    }, [selector]);

    return {
      ...stateRef.current,
      ...actions,
      getState,
      setState,
      subscribe,
    };
  };

  // Apply middlewares
  middlewares.forEach((middleware) =>
    middleware({ getState, setState, subscribe })
  );

  return useStore;
};
