import routeUtil from "../utils/route.util";
import api, {
  PaginateRequest,
  ResponseCallback,
  PaginateResponse,
} from "../services/request.service";

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

type TemplatePaginateResponse = PaginateResponse<Template[]>;

const routes = {
  create: "/templates",
  read: "/templates/{id}",
  edit: "/templates/{id}",
  delete: "/templates/{id}",
  list: "/templates",
  paginate: "/templates/paginate",
};

export default {
  create(payload: CreateRequest, callback: ResponseCallback<Template>) {
    api.post(routes.create, payload, callback);
  },

  read(id: number, callback: ResponseCallback<Template>) {
    const url = routeUtil.replaceParams(routes.read, { id });
    api.get(url, {}, callback);
  },

  edit(id: number, payload: EditRequest, callback: ResponseCallback<Template>) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    api.patch(url, payload, callback);
  },

  delete(id: number, callback: ResponseCallback<Template>) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    api.delete(url, {}, callback);
  },

  list(callback: ResponseCallback<Template[]>) {
    api.get(routes.list, {}, callback);
  },

  paginate(
    params: PaginateRequest,
    callback: ResponseCallback<TemplatePaginateResponse>
  ) {
    api.get(routes.paginate, params, callback);
  },
};
