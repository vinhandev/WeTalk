import { useQuery } from '@tanstack/react-query';
import testApi from '../api/test';

export const getUserProfile = () => {
  return useQuery({
    queryKey: ['get_profile'],
    queryFn: testApi.getUserProfile,
  });
};
