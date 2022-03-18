import routeUtil from "../utils/route.util";
import api, {
  PaginateRequest,
  ResponseCallback,
  PaginateResponse,
} from "../services/request.service";
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
  contacts: File;
}

type ContactPaginateResponse = PaginateResponse<Contact[]>;

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
  create(payload: CreateRequest, callback: ResponseCallback<Contact>) {
    api.post(routes.create, payload, callback);
  },

  read(id: number, callback: ResponseCallback<Contact>) {
    const url = routeUtil.replaceParams(routes.read, { id });
    api.get(url, {}, callback);
  },

  edit(id: number, payload: EditRequest, callback: ResponseCallback<Contact>) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    api.patch(url, payload, callback);
  },

  delete(id: number, callback: ResponseCallback<Contact>) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    api.delete(url, {}, callback);
  },

  paginate(
    params: PaginateRequest,
    callback: ResponseCallback<ContactPaginateResponse>
  ) {
    api.get(routes.paginate, params, callback);
  },

  import(payload: ImportRequest, callback: ResponseCallback<Contact[]>) {
    api.postForm(routes.import, payload, callback);
  },

  export(callback: ResponseCallback<Blob>) {
    api.get(routes.export, {}, callback);
  },
};
