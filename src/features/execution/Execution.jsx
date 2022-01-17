/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Stack,
  ButtonGroup,
  Button,
  IconButton,
  Fab,
  Typography,
  Paper,
} from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';

import { vectorSimulation } from './vectorSimulation';
import { OperationsTable } from './OperationsTable';
import { Box } from '@mui/system';
import { ConveyorTable } from './ConveyorTable';

const types = {
  '+': 'Addition',
  '*': 'Multiplication',
  '/': 'Division',
};

export function Execution({ tree }) {
  const [tick, setTick] = React.useState(0);
  const result = vectorSimulation(tree);

  const increase = () => setTick((prev) => Math.min(prev + 1, result.length - 1));
  const decrease = () => setTick((prev) => Math.max(prev - 1, 0));

  const chosen = result[tick];

  return (
    <>
      <Stack gap={3}>
        <OperationsTable operations={chosen.operations} />
        <Stack direction="row" gap={5} alignItems="center">
          <ButtonGroup>
            <Button onClick={decrease}>
              <ChevronLeft />
            </Button>
            <Button>Tick: {tick}</Button>
            <Button onClick={increase}>
              <ChevronRight />
            </Button>
          </ButtonGroup>
          <Typography variant="h6">Total: {result.length}</Typography>
        </Stack>
        {Object.entries(chosen.conveyors).map(([type, data], key) => (
          <Box key={key}>
            <Typography variant='h6'>{types[type]}</Typography>
            <Stack gap={3} direction='row'>
              {data.map((entries, idx) => (
                <Paper sx={{ flexGrow: 1 }} key={idx}>
                  <ConveyorTable data={entries} />
                </Paper>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
}
