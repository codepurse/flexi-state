import { useEffect, useState } from "react";

export const createStore = (initializeStore) => {
  let state = initializeStore(null);
  let listeners = [];

  const getState = () => state;

  const setState = (newState) => {
    if (shallowEqual(state, newState)) return;
    state = newState; // Update state directly
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const actions = {};
  for (const [key, action] of Object.entries(initializeStore(state))) {
    if (typeof action === "function") {
      actions[key] = (...args) => {
        console.log("Action:", key);
        const updater = action(...args); // Get the updater function
        const newState = updater(state);
        setState(newState);
      };
    }
  }

  return (selector = getState) => {
    const [currentState, setCurrentState] = useState(selector(getState()));

    useEffect(() => {
      const unsubscribe = subscribe((newState) => {
        const selectedState = selector(newState);
        if (!shallowEqual(currentState, selectedState)) {
          // Update state only if it has changed
          setCurrentState(selectedState);
        }
      });
      return unsubscribe;
    }, [selector]);

    return { ...currentState, ...actions }; // Return both state and actions
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

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) return false;
  }

  return true;
};
