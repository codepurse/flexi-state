import { useEffect, useState } from "react";
import { deepMerge, shallowEqual } from "./util";

export const createStore = (initializeStore, middleware = (store) => store) => {
  let state = initializeStore(null);
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

  return (selector = getState) => {
    const [currentState, setCurrentState] = useState(selector(getState()));

    useEffect(() => {
      const listener = (newState) => {
        const selectedState = selector(newState);
        if (!shallowEqual(currentState, selectedState)) {
          // Update state only if it has changed
          setCurrentState(selectedState);
        }
      };

      // Subscribe to the store
      const unsubscribe = subscribe(listener);

      // Clean up subscription
      return () => {
        unsubscribe();
      };
    }, [selector]);

    return { ...currentState, ...actions, getState, setState, subscribe };
  };
};
