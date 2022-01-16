import * as React from 'react';
import { Container, Paper, Tab, Tabs } from '@mui/material';

import { Tree } from './features/tree/Tree';
import { Form } from './features/form/Form';

export function App() {
  const [expression, setExpression] = React.useState('');

  return (
    <Container>
      <Form onSubmit={(value) => setExpression(value)} />
      <Tabs>
        <Tab label="Validation" />
        <Tab label="Tree" />
        <Tab label="Execution" />
      </Tabs>
      <Paper>
        <Tree expression={expression} />
      </Paper>
    </Container>
  );
}
