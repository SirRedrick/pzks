import { isOperator } from 'util';
import { Status } from './models';

function findOperations(node, stack) {
  const { left, right } = node;
  const operation = {};

  if (left && isOperator(left.value)) {
    const op = findOperations(left, stack);
    operation.left = op.name;
  } else {
    operation.left = left.value;
  }

  if (right && isOperator(right.value)) {
    const op = findOperations(right, stack);
    operation.right = op.name;
  } else {
    operation.right = right.value;
  }

  operation.name = `Op${stack.length}`;
  operation.type = node.value;

  stack.push(operation);

  return operation;
}

export function getOperations(tree) {
  const operations = [];

  findOperations(tree, operations);

  const operationsTable = operations.reduce((acc, cur) => {
    const { name, ...rest } = cur;
    acc[name] = {
      ...rest,
      status: Status.Idle,
    };
    return acc;
  }, {});

  return setActive(operationsTable); 
}

function setActive(operationsTable) {
  const _operationsTable = { ...operationsTable };

  Object.entries(_operationsTable).forEach(([key, value]) => {
    const left = _operationsTable[value.left];
    const right = _operationsTable[value.right];

    if (!(left || right)) _operationsTable[key].status = Status.Active;
  });

  return _operationsTable;
}
