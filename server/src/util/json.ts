export const logJson = (name: string, obj: unknown) =>
  console.log(name, JSON.stringify(obj, null, 2));
