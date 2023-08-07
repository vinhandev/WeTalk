import { Stack } from '@mui/material';
import React from 'react';

export function Events({ events }: any) {
  return (
    <Stack
      sx={{
        border: '1px solid black',
        padding: 3,
        marginY: 1,
      }}
    >
      {events.map((event: any, index: number) => (
        <li key={index}>{event}</li>
      ))}
    </Stack>
  );
}
