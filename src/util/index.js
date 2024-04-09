export const shallowEqual = (objA, objB) => {
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

export const deepMerge = (target, source) => {
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
