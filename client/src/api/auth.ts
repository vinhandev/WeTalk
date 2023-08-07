import { axiosClient } from './axiosClient';

const url = 'auth';

type ROLES = 'user' | 'moderator' | 'admin';

export interface PostSignInPayload {
  username: string;
  password: string;
}

export interface PostSignUpPayload {
  username: string;
  email: string;
  password: string;
  roles: ROLES[];
}

export interface PostSignInResponse {
  id: string;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
}

const authApi = {
  async signIn(params: PostSignInPayload): Promise<PostSignInResponse> {
    const response = await axiosClient.post(`${url}/signin`, params);
    return response.data;
  },
  signUp(params: PostSignUpPayload) {
    return axiosClient.post(`${url}/signup`, params);
  },
};

export default authApi;
