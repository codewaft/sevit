import api, {
  PaginateRequest,
  ResponseCallback,
  PaginateResponse,
} from "../services/request.service";
import { Data as GroupData } from "./group.api";
import routeUtil from "../utils/route.util";

export interface Data {
  id: number;
  phone: string;
  groups?: GroupData;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CreateRequest {
  phone?: string;
  groups?: string[];
}

export interface EditRequest {
  groups?: string[];
}

export interface ImportRequest {
  contacts?: File;
}

type ContactPaginateResponse = PaginateResponse<Data[]>;

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
  create(payload: CreateRequest, callback: ResponseCallback<Data>) {
    api.post(routes.create, payload, callback);
  },

  read(id: number, callback: ResponseCallback<Data>) {
    const url = routeUtil.replaceParams(routes.read, { id });
    api.get(url, {}, callback);
  },

  edit(id: number, payload: EditRequest, callback: ResponseCallback<Data>) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    api.patch(url, payload, callback);
  },

  delete(id: number, callback: ResponseCallback<Data>) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    api.delete(url, {}, callback);
  },

  paginate(
    params: PaginateRequest,
    callback: ResponseCallback<ContactPaginateResponse>
  ) {
    api.get(routes.paginate, params, callback);
  },

  import(payload: ImportRequest, callback: ResponseCallback<Data[]>) {
    api.postForm(routes.import, payload, callback);
  },

  export(callback: ResponseCallback<Blob>) {
    api.get(routes.export, {}, callback);
  },
};
