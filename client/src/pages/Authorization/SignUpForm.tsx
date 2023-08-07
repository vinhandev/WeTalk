import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { signIn } from '../../hooks/signIn';
import { signUp } from '../../hooks/signUp';
const schema = yup.object().shape({
  username: yup.string().required('Tên đăng nhập không được để trống.'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được để trống.'),
  password: yup.string().required('Mật khẩu không được để trống.'),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu không được để trống.'),
});

export default function LoginForm() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync: handleSignUp } = signUp();

  const onSubmit = async (params: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (params.password === params.confirmPassword) {
      await handleSignUp({
        username: params.username,
        email: params.email,
        password: params.password,
        roles: ['user'],
      });
    }
  };

  return (
    <Stack>
      <TextField {...register('username')} />
      <TextField {...register('email')} />
      <TextField {...register('password')} type="password" />
      <TextField {...register('confirmPassword')} type="password" />
      <Button onClick={handleSubmit(onSubmit)}>Đăng kí</Button>
    </Stack>
  );
}
