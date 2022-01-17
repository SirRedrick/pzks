import * as React from 'react';
import { drawBinaryTree } from 'binary-tree-visualizer';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useToggle } from 'hooks';
import { binaryTreeFromArithmeticExpr } from './createTree';

export function Tree({ expression, onReadyTree }) {
  const [balanced, toggleBalanced] = useToggle(true);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      try {
        const root = binaryTreeFromArithmeticExpr(expression, balanced);
        drawBinaryTree(root, canvasRef.current, {
          maxHeight: 500,
          maxWidth: 500,
        });
        onReadyTree(root);
      } catch (err) {
        console.error(err);
      }
    }
  }, [expression, balanced]);

  console.log(balanced);

  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Switch />} label='Balanced' checked={balanced} onChange={() => toggleBalanced()} />
      </FormGroup>
      <TransformWrapper>
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
          <canvas ref={canvasRef} />
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
