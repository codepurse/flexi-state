import { useEffect, useReducer, useRef } from "react";
import { deepMerge, shallowEqual } from "./util/utils";

export const createStore = (
  initializeStore,
  middlewares = [],
  options = {}
) => {
  let state = initializeStore({});
  let listeners = new Set();
  let stateInitializer = initializeStore;
  const { onPreStateChange, onPostStateChange } = options;

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

    // Call the onPreStateChange hook and get the updated state
    let preUpdatedState = updatedState;
    if (typeof onPreStateChange === "function") {
      preUpdatedState = onPreStateChange(state, updatedState) || updatedState;
    }

    state = preUpdatedState;
    listeners.forEach((listener) => listener(state));

    // Call the onPostStateChange hook and get the updated state
    let postUpdatedState = state;
    if (typeof onPostStateChange === "function") {
      postUpdatedState = onPostStateChange(state) || state;
    }

    // Call the onStateChange hook
    if (typeof options.onStateChange === "function") {
      options.onStateChange(state, postUpdatedState);
    }

    if (!shallowEqual(state, postUpdatedState)) {
      state = postUpdatedState;
      listeners.forEach((listener) => listener(state));
    }
  };
  let actions = {};
  for (const [key, action] of Object.entries(initializeStore(state))) {
    if (typeof action === "function") {
      actions[key] = (...args) => {
        const updater = action(...args);
        const newState = updater(state);
        setState(newState);
      };
    }
  }
  const useStore = (selector = (state) => state) => {
    const stateRef = useRef(selector(state));
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
      const listener = (newState) => {
        const selectedState = selector(newState);
        if (!shallowEqual(stateRef.current, selectedState)) {
          stateRef.current = selectedState;
          forceUpdate();
        }
      };
      const unsubscribe = subscribe(listener);
      return () => {
        unsubscribe();
      };
    }, [selector]);

    if (!selector || selector.toString() === ((state) => state).toString()) {
      return { ...stateRef.current, ...actions };
    }

    return {
      ...stateRef.current,
      ...Object.fromEntries(
        Object.entries(actions).filter(([key]) => key in stateRef.current)
      ),
    };
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  // Apply middlewares
  middlewares.forEach((middleware) => {
    const middlewareResult = middleware({
      getState,
      setState,
      subscribe,
      state,
      actions,
    });
    if (middlewareResult) {
      const { state: dynamicState = {}, actions: dynamicActions = {} } =
        middlewareResult;
      state = { ...state, ...dynamicState };
      actions = { ...actions, ...dynamicActions };
    }
  });

  return useStore;
};
