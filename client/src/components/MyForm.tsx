import React, { useState } from 'react';
import { socket } from '../socket';

interface Props {
  setValue: (value: string) => void;
  onSubmit: (e: any) => void;
}

export function MyForm({ onSubmit, setValue }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
