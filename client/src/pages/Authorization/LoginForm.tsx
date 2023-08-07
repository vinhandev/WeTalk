import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { signIn } from '../../hooks/signIn';
import { useEffect } from 'react';
import Logo from '../../components/Logo';
const schema = yup.object().shape({
  username: yup.string().required('Tên đăng nhập không được để trống.'),
  password: yup.string().required('Mật khẩu không được để trống.'),
});

export default function LoginForm({ onRegister }: { onRegister: () => void }) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync: handleSignIn, error } = signIn();

  const onSubmit = async (params: { username: string; password: string }) => {
    const response = await handleSignIn(params);
    localStorage.setItem('token', response.accessToken);
    window.location.reload();
  };

  useEffect(() => {
    if (error) {
      alert((error as any).response.data.message);
    }
  }, [error]);

  return (
    <Stack
      sx={{
        maxHeight: '100vh',
      }}
    >
      <Stack
        sx={{
          margin: 1,
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        <Stack
          sx={{
            padding: 6,
          }}
        >
          <Stack
            sx={{
              height: '100%',
              position: 'relative',
              justifyContent: 'center',
              minWidth: '30vw',
            }}
          >
            <Stack
              sx={{
                position: 'absolute',
                top: '10px',
                left: '10px',
              }}
            >
              <Logo />
            </Stack>
            <Typography
              sx={{
                fontSize: '40px',
                fontFamily: 'Dosis',
                fontWeight: 'bold',
              }}
            >
              Welcome Back
            </Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                }}
              >
                New To WETALK ?{' '}
              </Typography>
              <Typography
                onClick={onRegister}
                sx={{
                  marginLeft: 1,
                  fontFamily: 'Roboto',
                  color: 'blue',
                  ':hover': {
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  },
                }}
              >
                {' '}
                Create New Account
              </Typography>
            </Stack>
            <Stack marginTop={2}>
              <TextField
                margin="normal"
                variant="outlined"
                label={'Email'}
                {...register('username')}
              />
              <TextField
                margin="normal"
                variant="outlined"
                label={'Password'}
                {...register('password')}
                type="password"
              />
              <Button
                sx={{
                  marginTop: 1,
                }}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Đăng nhập
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            component="img"
            alt="anh nen"
            src="https://images.unsplash.com/photo-1522728000856-8721ca26ccd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
