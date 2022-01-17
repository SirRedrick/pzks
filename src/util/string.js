const operatorRegExp = /[+-/*]/;

export function isOperator(char) {
  if (char.length !== 1) throw new TypeError(`Input must be 1 character long, "${char}" is ${char.length}`);

  return operatorRegExp.test(char);
}
