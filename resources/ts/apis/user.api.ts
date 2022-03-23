import api from "../services/request.service";

export interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}

interface SignInRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

const routes = {
  signIn: "/users/sign-in",
  read: "/users",
};

export default {
  signIn(payload: SignInRequest) {
    return api.post<SignInResponse>(routes.signIn, payload);
  },

  read() {
    return api.get<User>(routes.read);
  },
};
