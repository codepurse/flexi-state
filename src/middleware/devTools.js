export const devTools = ({ name }) => {
  let connection;

  return (store) => {
    console.log(store);
    if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
      connection = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name: name,
      });
    } else {
      connection = {
        send: (_, __) => {
          console.log("Redux DevTools Extension not detected");
        },
      };
    }
    console.log(store.actions);
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      connection.send("state update", state);
    });

    // Return unsubscribe function to clean up on unmount
    return () => {
      unsubscribe();
    };
  };
};
