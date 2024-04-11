export const logging = () => {
  return (store) => {
    let prevState = store.getState(); // Initialize previous state

    // Subscribe to state changes and log them
    const unsubscribe = store.subscribe((newState) => {
      console.log("Previous State:", prevState);
      console.log("New State:", newState);
    });

    // Return unsubscribe function to clean up on unmount
    return () => {
      unsubscribe();
    };
  };
};
