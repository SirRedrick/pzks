import * as React from 'react';
import { Container, Paper, Tab, Tabs, Typography } from '@mui/material';

import { Tree } from './features/tree/Tree';
import { Form } from './features/form/Form';
import { TabPanel } from './components/TabPanel';
import { Execution } from './features/execution/Execution';

// m/x+a+b*c*d*e

export function App() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [expression, setExpression] = React.useState('');
  const [tree, setTree] = React.useState(null);

  return (
    <Container>
      <Form onSubmit={(value) => setExpression(value)} />
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Validation" />
        <Tab label="Tree" />
        <Tab label="Execution" />
      </Tabs>
      <Paper elevation={5} sx={{ marginBottom: 5 }}>
        <TabPanel value={activeTab} index={0}>
          <Typography>Under Development</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Tree expression={expression} onReadyTree={(tree) => setTree(tree)} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Execution tree={tree} />
        </TabPanel>
      </Paper>
    </Container>
  );
}
