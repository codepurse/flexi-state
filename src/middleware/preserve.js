export const preserve = (storageType, storageName, stateKeys) => {
  return (store) => {
    const persistState = (state) => {
      try {
        if (typeof window !== "undefined" && window[storageType]) {
          const persistedState = {};
          stateKeys.forEach((key) => {
            persistedState[key] = state[key];
          });
          const serializedState = JSON.stringify(persistedState);
          window[storageType].setItem(storageName, serializedState);
        }
      } catch (error) {
        console.error("Error while persisting state:", error);
      }
    };

    const loadState = () => {
      try {
        if (typeof window !== "undefined") {
          const persistedState = window[storageType].getItem(storageName);
          if (persistedState) {
            return JSON.parse(persistedState);
          }
        }
      } catch (error) {
        console.error("Error while loading persisted state:", error);
      }
      return undefined;
    };

    // Load persisted state on initialization
    const initialState = loadState();
    if (initialState) {
      store.setState(initialState);
    } else {
      // Use the initial state from the initializeStore function
      store.setState(store.getState());
    }

    // Subscribe to state changes and persist selected state slices

    if (typeof window !== "undefined") {
      try {
        const unsubscribe = store.subscribe((state) => {
          persistState(state);
        });

        // Return unsubscribe function to clean up on unmount
        return unsubscribe;
      } catch (error) {}
    }
  };
};
