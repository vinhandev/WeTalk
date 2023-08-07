import { axiosClient } from './axiosClient';

const url = 'test';

export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
}

const testApi = {
  async getUserProfile(): Promise<UserProfileResponse> {
    const token = localStorage.getItem('token');
    const response = await axiosClient.get(`${url}/user`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  },
};

export default testApi;
