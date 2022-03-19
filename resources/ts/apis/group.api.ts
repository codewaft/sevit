import type { PaginateResponse } from "../services/request.service";
import routeUtil from "../utils/route.util";
import api from "../services/request.service";

export interface Group {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateRequest {
  title: string;
}

export interface EditRequest {
  title: string;
}

const routes = {
  create: "/groups",
  read: "/groups/{id}",
  edit: "/groups/{id}",
  delete: "/groups/{id}",
  list: "/groups",
  paginate: "/groups/paginate",
};

export default {
  create(payload: CreateRequest) {
    return api.post(routes.create, payload);
  },

  read(id: number) {
    const url = routeUtil.replaceParams(routes.read, { id });
    return api.get(url);
  },

  edit(id: number, payload: EditRequest) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    return api.patch(url, payload);
  },

  delete(id: number) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    return api.delete(url);
  },

  list() {
    return api.get(routes.list);
  },

  paginate() {
    return api.get<PaginateResponse<Group[]>>(routes.paginate);
  },
};
