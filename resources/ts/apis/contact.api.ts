import type { PaginateResponse } from "../services/request.service";
import routeUtil from "../utils/route.util";
import api from "../services/request.service";
import { Group } from "./group.api";

export interface Contact {
  id: number;
  phone: string;
  groups: Group[];
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateRequest {
  phone: string;
  groups: number[];
}

export interface EditRequest {
  groups: number[];
}

export interface ImportRequest {
  contacts: File | null;
}

const routes = {
  create: "/contacts",
  read: "/contacts/{id}",
  edit: "/contacts/{id}",
  delete: "/contacts/{id}",
  paginate: "/contacts/paginate",
  import: "/contacts/import",
  export: "/contacts/export",
};

export default {
  create(payload: CreateRequest) {
    return api.post<Contact>(routes.create, payload);
  },

  read(id: number) {
    const url = routeUtil.replaceParams(routes.read, { id });
    return api.get<Contact>(url);
  },

  edit(id: number, payload: EditRequest) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    return api.patch<Contact>(url, payload);
  },

  delete(id: number) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    return api.delete<Contact>(url);
  },

  paginate(url?: string) {
    const route = url || routes.paginate;
    return api.get<PaginateResponse<Contact[]>>(route);
  },

  import(payload: ImportRequest) {
    return api.postForm<Contact[]>(routes.import, payload);
  },

  export() {
    return api.get<string>(routes.export);
  },
};
