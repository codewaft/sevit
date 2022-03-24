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
  read: "/users",
  signIn: "/users/sign-in",
  signOut: "/users/sign-out",
};

export default {
  read() {
    return api.get<User>(routes.read);
  },

  signIn(payload: SignInRequest) {
    return api.post<SignInResponse>(routes.signIn, payload);
  },

  signOut() {
    return api.get<true>(routes.signOut);
  },
};
