export const channelBroadcast = (broadcastKey) => {
  let broadcastChannel = null;

  return (store) => {
    const handleBroadcastMessage = (event) => {
      const { type, payload } = event.data;
      if (type === "STATE_UPDATE" && payload && typeof payload === "object") {
        store.setState(payload);
      }
    };

    const initializeBroadcastChannel = () => {
      broadcastChannel = new BroadcastChannel(broadcastKey);
      broadcastChannel.onmessage = handleBroadcastMessage;
    };

    const sendStateUpdate = (state) => {
      // Omit any functions from the state before broadcasting
      const stateToSend = Object.fromEntries(
        Object.entries(state).filter(([, value]) => typeof value !== "function")
      );

      if (broadcastChannel) {
        broadcastChannel.postMessage({
          type: "STATE_UPDATE",
          payload: stateToSend,
        });
      }
    };

    // Initialize broadcast channel
    initializeBroadcastChannel();

    // Subscribe to state changes and broadcast updates
    const unsubscribe = store.subscribe((state) => {
      sendStateUpdate(state);
    });

    // Return unsubscribe function to clean up on unmount
    return () => {
      if (broadcastChannel) {
        broadcastChannel.close();
      }
      unsubscribe();
    };
  };
};
