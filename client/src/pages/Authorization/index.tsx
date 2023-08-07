import { Stack } from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../hooks/getUserProfile';
import { useBoolean } from '../../hooks/useBoolean';

export default function Authorization() {
  const { toggle, value } = useBoolean(true);

  return (
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack
        sx={{
          width: value ? '100%' : '0px',
        }}
      >
        <LoginForm onRegister={toggle} />
      </Stack>
      <Stack
        sx={{
          width: !value ? '100%' : '0px',
        }}
      >
        <SignUpForm />
      </Stack>
    </Stack>
  );
}
