import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { forEach } from "lodash";
import routes from "../routes";
import storageService from "./storage.service";
import progressBar from "./progressBar.service";
import alertService from "./alert.service";
import autoNavigateService from "./autoNavigate.service";

type ContentType = "json" | "form";
type ContentMimes = Record<ContentType, string>;

type ReqReturn<ResponseData> = Promise<ResponseData | null>;

export interface PaginateResponse<PaginateData> {
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  total: number;
  per_page: number;
  data: PaginateData;
}

const contentMimes: ContentMimes = {
  json: "application/json",
  form: "multipart/form-data",
};

export default {
  client(contentType: ContentType = "json") {
    const token = storageService.get("authToken");
    const client = axios.create({
      baseURL: `/api`,
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: contentMimes[contentType],
      },
    });
    const request = {
      success(config: AxiosRequestConfig) {
        progressBar.start();
        return config;
      },
      error(error: any) {
        progressBar.stop();
        return Promise.reject(error);
      },
    };
    const response = {
      success(response: AxiosResponse) {
        progressBar.stop();
        return response;
      },
      error(error: any) {
        progressBar.stop();
        return Promise.reject(error);
      },
    };
    client.interceptors.request.use(request.success, request.error);
    client.interceptors.response.use(response.success, response.error);
    return client;
  },

  handleError(error: any) {
    const { response } = error;
    const unauthorized = response && response.status === 401;
    const requestError = response && response.data.message;
    const message = requestError || error.message;
    alertService.error(message);
    if (unauthorized) {
      storageService.remove("authToken");
      autoNavigateService.push(routes.signIn);
    }
    console.error(error);
  },

  get<Resp>(url: string, params: object = {}): ReqReturn<Resp> {
    return new Promise((resolve) => {
      this.client()
        .get<Resp>(url, { params })
        .then((response) => resolve(response.data))
        .catch((error) => {
          resolve(null);
          this.handleError(error);
        });
    });
  },

  post<Resp>(url: string, payload: object): ReqReturn<Resp> {
    return new Promise((resolve) => {
      this.client()
        .post<Resp>(url, payload)
        .then((response) => resolve(response.data))
        .catch((error) => {
          resolve(null);
          this.handleError(error);
        });
    });
  },

  postForm<Resp>(url: string, payload: object): ReqReturn<Resp> {
    return new Promise((resolve) => {
      const fields = payload as unknown as object;
      const formData = new FormData();
      forEach(fields, (value, key) => formData.append(key, value));
      this.client("form")
        .post<Resp>(url, formData)
        .then((response) => resolve(response.data))
        .catch((error) => {
          resolve(null);
          this.handleError(error);
        });
    });
  },

  patch<Resp>(url: string, payload: object): ReqReturn<Resp> {
    return new Promise((resolve) => {
      this.client()
        .patch<Resp>(url, payload)
        .then((response) => resolve(response.data))
        .catch((error) => {
          resolve(null);
          this.handleError(error);
        });
    });
  },

  delete<Resp>(url: string, payload: object = {}): ReqReturn<Resp> {
    return new Promise((resolve) => {
      const config = { data: payload };
      this.client()
        .delete<Resp>(url, config)
        .then((response) => resolve(response.data))
        .catch((error) => {
          resolve(null);
          this.handleError(error);
        });
    });
  },
};
