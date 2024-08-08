export const generateRandomData = (numItems: number) => {
  return Array.from({ length: numItems }, () => ({
    value: Math.floor(Math.random() * 100),
  }));
};
