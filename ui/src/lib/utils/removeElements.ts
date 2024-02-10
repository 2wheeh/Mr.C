export function removeElements<T>(sourceArray: T[], elementsToRemove: T[]) {
  const setToRemove = new Set(elementsToRemove);
  return sourceArray.filter((v) => !setToRemove.has(v));
}
