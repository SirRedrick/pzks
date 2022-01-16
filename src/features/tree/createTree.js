import { BinaryTreeNode } from 'binary-tree-visualizer';
import { peek } from '../../util';

export function binaryTreeFromArithmeticExpr(expr) {
  const postfixExpr = infixToPostfix(expr);
  const stack = [];

  postfixExpr.map((char) => new BinaryTreeNode(char)).forEach((node) => {
    const isOperator = node.value in operators;

    if (!isOperator) {
      return stack.push(node);
    }
  
    const lastIdx = stack.length - 1;
  
    if (lastIdx === 0) {
      node.setLeft(stack.pop());
    } else {
      node.setRight(stack.pop());
      node.setLeft(stack.pop());
    }
  
    stack.push(node);
  });

  const res = balance(stack[0]);
  console.log(getBalance(res));
  return res;
}

const operators = { '+': 1, '-': 1, '*': 2, '/': 2 };
const brackets = ['(', ')'];
const operatorRegExp = new RegExp(/([-+*/()]{1})/);

function infixToPostfix(infixExpr) {
  const _expr = infixExpr.split(operatorRegExp).filter(Boolean);
  const output = [];
  const operatorStack = [];

  _expr.forEach((char) => {
    const isOperator = char in operators;
    const isBracket = brackets.includes(char);
    const isConstant = !(isOperator || isBracket);

    if (isConstant) return output.push(char);

    const topOperator = peek(operatorStack);
    const isTopBracket = brackets.includes(topOperator);

    if (char === ')') {
      const openingIdx = operatorStack.lastIndexOf('(');
      const split = operatorStack.slice(openingIdx + 1).reverse();
      output.push(...split);
      return operatorStack.splice(openingIdx);
    }

    if (!topOperator || isBracket) {
      return operatorStack.push(char);
    }

    if (!isTopBracket && operators[char] <= operators[topOperator]) {
      const popped = operatorStack.pop();
      output.push(popped);
    }

    operatorStack.push(char);
  });

  output.push(...operatorStack.reverse());

  return output;
}

const switchMap = {
  '-': '+',
  '/': '*',
};

export function balance(root) {
  const right= root.right;
  const left= root.left;

  if (!left && !right) return root;

  if (right) root.right = balance(right);
  if (left) root.left = balance(left);


  const rootBalance = getBalance(root);
  const leftBalance = getBalance(left);
  const rightBalance = getBalance(right);
  
  if (rootBalance > 1) {
    if (leftBalance < 0) root.setLeft(rotateLeft(left));
    root = rotateRight(root);
  } else if (rootBalance < -1) {
    if (rightBalance > 0) root.setRight(rotateRight(right));
    root = rotateLeft(root);
  }

  return root;
}

function getBalance(root) {
  const right= root.right;
  const left= root.left;

  if (!left && !right) return 0;
  if (!right) return left.getHeight();
  if (!left) return right.getHeight();

  return left.getHeight() - right.getHeight();
}

function rotateRight(root) {
  const left= root.left;

  if (root.value !== left.value) return root;

  const newValue = switchMap[root.value];

  const updatedRoot = updateTreeNode(root, newValue || root.value) ;

  const newRoot = updatedRoot.left;
  updatedRoot.left = updatedRoot.left?.right;
  newRoot.right = updatedRoot;

  return newRoot;
}

function rotateLeft(root) {
  const right= root.right;

  if (root.value !== right.value) return root;

  const newValue = switchMap[root.value];

  let updatedRoot = root;
  if (root.value === '-') {
    const updatedRight = updateTreeNode(right, newValue);
    updatedRoot.setRight(updatedRight);
  }
  if (root.value === '/') {
    updatedRoot = updateTreeNode(root, newValue);
  }
  
  const newRoot = updatedRoot.left;
  updatedRoot.right = updatedRoot.left;
  newRoot.left = root;
  return newRoot;
}

function updateTreeNode(node, value) {
  const { left, right } = node;

  const newNode = new BinaryTreeNode(value);
  if (left) newNode.setLeft(left);
  if (right) newNode.setRight(right);

  return newNode;
}