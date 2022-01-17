import * as React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


export function ConveyorTable({ data }) {
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Layer</TableCell>
            {data.map((_, idx) => <TableCell key={idx}>Tick {idx}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell variant='head'>{idx + 1}</TableCell>
              {row.map((cell, idx) => (
                <TableCell sx={{ borderLeft: '1px solid #000'}} key={idx}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
