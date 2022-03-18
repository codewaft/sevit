import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { forEach } from "lodash";
import routes from "../routes";
import storageService from "./storage.service";
import progressBar from "./progressBar.service";
import alertService from "./alert.service";

type ContentType = "json" | "form";
type ContentMimes = Record<ContentType, string>;

type ReqReturn<ResponseData> = Promise<ResponseData | null>;

export interface PaginateRequest {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginateResponse<PaginateData> {
  total: number;
  from: number | null;
  to: number | null;
  currentPage: number;
  lastPage: number;
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
      baseURL: `${process.env.REACT_APP_API_URL}`,
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
      window.location.href = routes.signIn;
    }
    console.error(error);
  },

  get<Resp>(url: string, params: object): ReqReturn<Resp> {
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

  post<Req, Resp>(url: string, payload: Req): ReqReturn<Resp> {
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

  postForm<Req, Resp>(url: string, payload: Req): ReqReturn<Resp> {
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

  patch<Req, Resp>(url: string, payload: Req): ReqReturn<Resp> {
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

  delete<Req, Resp>(url: string, payload: Req): ReqReturn<Resp> {
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
