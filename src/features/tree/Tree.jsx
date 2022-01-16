import * as React from 'react';
import { drawBinaryTree } from 'binary-tree-visualizer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { binaryTreeFromArithmeticExpr } from './createTree';

export function Tree({ expression }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      try {
        const root = binaryTreeFromArithmeticExpr(expression);
        drawBinaryTree(root, canvasRef.current, { maxHeight: 500, maxWidth: 500 });
      } catch (err) {
        console.error( err);
      }
    }
  }, [expression]);

  return (
    <TransformWrapper>
      <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
        <canvas ref={canvasRef} />
      </TransformComponent>
    </TransformWrapper>
  );
}