export const removeNullishValuesFromObject = <T extends object>(
  obj: T
): Partial<T> => {
  return Object.entries(obj)
    .filter(([_, value]) => value != null) // Filters out null and undefined
    .reduce<Partial<T>>(
      (acc, [key, value]) => ({ ...acc, [key as keyof T]: value }),
      {}
    );
};
