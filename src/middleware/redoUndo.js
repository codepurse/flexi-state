export const redoUndo = ({ getState, setState, subscribe }) => {
  let undoStack = [];
  let redoStack = [];

  undoStack.push(getState());

  const undo = () => {
    if (undoStack.length <= 1) return;
    redoStack.push(undoStack.pop());
    setState(undoStack.pop());
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    undoStack.push(getState());
    setState(redoStack.pop());
  };

  const recordStateChange = (state) => {
    undoStack.push(state);
  };

  subscribe(recordStateChange);

  return {
    actions: {
      undo,
      redo,
    },
  };
};
