import api from "../services/request.service";

interface SignInRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

const routes = {
  signIn: "/users/sign-in",
};

export default {
  signIn(payload: SignInRequest) {
    return api.post<SignInResponse>(routes.signIn, payload);
  },
};
