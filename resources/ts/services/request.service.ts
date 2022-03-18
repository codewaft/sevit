import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { forEach } from "lodash";
import routes from "../routes";
import storageService from "./storage.service";
import alert from "./alert.service";
import progressBar from "./progressBar.service";

type ContentType = "json" | "form";
type ContentMimes = Record<ContentType, string>;

export interface ResponseCallback<ResponseData> {
  (data: ResponseData | null): void;
}

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
        progressBar.add();
        return config;
      },
      error(error: any) {
        progressBar.remove();
        return Promise.reject(error);
      },
    };
    const response = {
      success(response: AxiosResponse) {
        progressBar.remove();
        return response;
      },
      error(error: any) {
        progressBar.remove();
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
    alert.error(message);
    if (unauthorized) {
      storageService.remove("authToken");
      window.location.href = routes.signIn;
    }
    console.error(error);
  },

  get<ResponseData>(
    url: string,
    params: object,
    callback: ResponseCallback<ResponseData>
  ) {
    this.client()
      .get<ResponseData>(url, { params })
      .then((response) => callback(response.data))
      .catch((error) => {
        callback(null);
        this.handleError(error);
      });
  },

  post<RequestData, ResponseData>(
    url: string,
    payload: RequestData,
    callback: ResponseCallback<ResponseData>
  ) {
    this.client()
      .post<ResponseData>(url, payload)
      .then((response) => callback(response.data))
      .catch((error) => {
        callback(null);
        this.handleError(error);
      });
  },

  postForm<RequestData, ResponseData>(
    url: string,
    payload: RequestData,
    callback: ResponseCallback<ResponseData>
  ) {
    const fields = payload as unknown as object;
    const formData = new FormData();
    forEach(fields, (value, key) => formData.append(key, value));
    this.client("form")
      .post<ResponseData>(url, formData)
      .then((response) => callback(response.data))
      .catch((error) => {
        callback(null);
        this.handleError(error);
      });
  },

  patch<RequestData, ResponseData>(
    url: string,
    payload: RequestData,
    callback: ResponseCallback<ResponseData>
  ) {
    this.client()
      .patch<ResponseData>(url, payload)
      .then((response) => callback(response.data))
      .catch((error) => {
        callback(null);
        this.handleError(error);
      });
  },

  delete<RequestData, ResponseData>(
    url: string,
    payload: RequestData,
    callback: ResponseCallback<ResponseData>
  ) {
    const config = { data: payload };
    this.client()
      .delete<ResponseData>(url, config)
      .then((response) => callback(response.data))
      .catch((error) => {
        callback(null);
        this.handleError(error);
      });
  },
};
