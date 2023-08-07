import { useMutation } from '@tanstack/react-query';
import authApi from '../api/auth';

export const signIn = () => {
  return useMutation({
    mutationKey: ['sign_in'],
    mutationFn: authApi.signIn,
  });
};
