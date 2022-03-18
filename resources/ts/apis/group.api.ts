import api, {
  PaginateRequest,
  ResponseCallback,
  PaginateResponse,
} from "../services/request.service";
import routeUtil from "../utils/route.util";

export interface Data {
  id: number;
  title: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CreateRequest {
  title?: string;
}

export interface EditRequest {
  title?: string;
}

type GroupPaginateResponse = PaginateResponse<Data[]>;

const routes = {
  create: "/groups",
  read: "/groups/{id}",
  edit: "/groups/{id}",
  delete: "/groups/{id}",
  list: "/groups",
  paginate: "/groups/paginate",
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

  list(callback: ResponseCallback<Data[]>) {
    api.get(routes.list, {}, callback);
  },

  paginate(
    params: PaginateRequest,
    callback: ResponseCallback<GroupPaginateResponse>
  ) {
    api.get(routes.paginate, params, callback);
  },
};
