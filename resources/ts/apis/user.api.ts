import api, { ResponseCallback } from "../services/request.service";

export interface SignInRequest {
  username?: string;
  password?: string;
}

interface SignInResponse {
  token: string;
}

const routes = {
  signIn: "/sign-in",
};

export default {
  signIn(payload: SignInRequest, callback: ResponseCallback<SignInResponse>) {
    api.get(routes.signIn, payload, callback);
  },
};
