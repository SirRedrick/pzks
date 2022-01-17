import { Status } from './models';
import { getOperations } from './util';

/* eslint-disable no-unused-vars */
class Conveyor {
  constructor(layers) {
    this.numOfLayers = layers;
    this.done = null;
    this.layers = Array(layers).fill().map(() => Array(layers).fill(null));
  }

  open() {
    return this.layers[0][0] === null;
  }

  tick() {
    for(let i  = this.numOfLayers - 1; i >= 0; i--) {
      if (i === this.numOfLayers - 1) {
        this.done = this.layers[i][i];
        this.done;
      }

      if (i === 0) {
        this.layers[i][i] = null;
      } else {
        this.layers[i][i] = this.layers[i - 1][i - 1];
      }
    }
  }

  input(operation) {
    this.layers[0][0] = operation;
  }

  getDone() {
    const res = this.done;
    this.done = null;
    return res;
  }
}

export function vectorSimulation(tree, config = {
  '+': {
    amount: 2,
    layers: 2,
  },
  '*': {
    amount: 3,
    layers: 3,
  },
  '/': {
    amount: 1,
    layers: 4,
  },
}) {
  const history = [];
  const operations = getOperations(tree);
  const conveyors = createConveyors(config);

  const snapshot = getSnapshot(operations, conveyors);
  history.push(snapshot);
  
  for (let tick = 1; !isFinished(operations); tick++) {
    const active = Object.keys(operations).filter((op) => operations[op].status === Status.Active);

    tickAll(conveyors);

    active.forEach((name) => {
      const type = operations[name].type === '-' ? '+' : operations[name].type;

      const open = getFirstOpen(conveyors, type);
      if (open) {
        operations[name].status = Status.InProgress;
        open.input(name);
      }
    });

    getDone(conveyors).forEach((doneOp) => {
      operations[doneOp].status = Status.Done;
    });

    markActive(operations);

    const snapshot = getSnapshot(operations, conveyors);
    history.push(snapshot);
  }

  return history;
}

function createConveyors(config) {
  return Object.entries(config).reduce((acc, [type, entry]) => {
    const { amount, layers } = entry;
    const conveyors = Array(amount).fill().map(() => new Conveyor(layers));
    acc[type] = conveyors;

    return acc;
  }, {});
}

function isFinished(operationsTable) {
  return Object.values(operationsTable).every(({ status }) => status === Status.Done);
}

function getFirstOpen(conveyors, type) {
  return conveyors[type].find((conveyor) => conveyor.open());
}

function tickAll(conveyors) {
  Object.values(conveyors).forEach((row) => row.forEach((conv) => conv.tick()));
}

function getDone(conveyors) {
  const done = [];
  Object.values(conveyors).forEach((conveyors) =>
    conveyors.forEach((conveyor) => {
      const doneName = conveyor.getDone();
      if (doneName) done.push(doneName);
    })
  );
  return done;
}

function markActive(operations) {
  Object.entries(operations).map(([name, data]) => {
    const { left, right, status } = data;

    if (status !== Status.Idle) return;

    const leftOp = operations[left];
    const leftIsDone = !leftOp || leftOp?.status === Status.Done;

    
    const rightOp = operations[right];
    const rightIsDone = !rightOp || rightOp?.status === Status.Done;
    
    if (leftIsDone && rightIsDone) {
      operations[name].status = Status.Active;
    }
  });
}

function getSnapshot(operations, conveyors) {
  const conveyorData = Object.entries(conveyors)
    .reduce((acc, [type, conveyorsByType]) => {
      acc[type] = [];

      conveyorsByType.forEach((conveyor) => {
        acc[type].push(conveyor.layers);
      });

      return acc;
    }, {});

  return {
    operations: JSON.parse(JSON.stringify(operations)),
    conveyors: JSON.parse(JSON.stringify(conveyorData)),
  };
}
