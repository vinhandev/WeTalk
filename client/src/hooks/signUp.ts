import { useMutation } from '@tanstack/react-query';
import authApi from '../api/auth';

export const signUp = () => {
  return useMutation({
    mutationKey: ['sign_up'],
    mutationFn: authApi.signUp,
  });
};
