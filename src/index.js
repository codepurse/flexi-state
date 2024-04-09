import { useEffect, useState } from "react";

export const createStore = (initializeStore) => {
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

      const unsubscribe = subscribe(listener);

      return () => {
        unsubscribe();
      };
    }, [selector]);

    return { ...currentState, ...actions, getState, setState, subscribe };
  };
};

const shallowEqual = (objA, objB) => {
  if (objA === objB) return true;
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  for (const key in objA) {
    if (objA.hasOwnProperty(key)) {
      if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
        return false;
      }
    }
  }

  for (const key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};

const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};
