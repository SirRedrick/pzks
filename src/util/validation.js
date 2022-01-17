export function isBoolean(value) {
  const type = typeof value;
  if (type !== 'boolean') throw TypeError(`Expected "boolean" but got ${type}`);
}
