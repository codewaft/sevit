import type { PaginateResponse } from "../services/api.service";
import routeUtil from "../utils/route.util";
import api from "../services/api.service";

export interface Template {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateRequest {
  title: string;
  content: string;
}

export interface EditRequest {
  title: string;
  content: string;
}

const routes = {
  create: "/templates",
  read: "/templates/{id}",
  edit: "/templates/{id}",
  delete: "/templates/{id}",
  list: "/templates",
  paginate: "/templates/paginate",
};

export default {
  create(payload: CreateRequest) {
    return api.post<Template>(routes.create, payload);
  },

  read(id: number) {
    const url = routeUtil.replaceParams(routes.read, { id });
    return api.get<Template>(url);
  },

  edit(id: number, payload: EditRequest) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    return api.patch<Template>(url, payload);
  },

  delete(id: number) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    return api.delete<Template>(url);
  },

  list() {
    return api.get<Template[]>(routes.list);
  },

  paginate(url?: string) {
    const route = url || routes.paginate;
    return api.get<PaginateResponse<Template[]>>(route);
  },
};
