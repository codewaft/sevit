import type { PaginateResponse } from "../services/api.service";
import routeUtil from "../utils/route.util";
import api from "../services/api.service";
import { Group } from "./group.api";
import { Template } from "./template.api";
import { Contact } from "./contact.api";

export interface Broadcast {
  id: number;
  template_id: number;
  title: string;
  status: Status;
  scheduled_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  messagesCount: number;
  completedMessagesCount: number;
  template: Template;
  groups: Group[];
}

export type MessageStatus = "scheduled" | "processed" | "failed";
export type Status = "scheduled" | "processing" | "completed";

export interface Message {
  id: number;
  broadcast_id: number;
  contact_id: number;
  reference_id: string;
  status: MessageStatus;
  contact: Contact;
  processed_at: string;
}

export interface CreateRequest {
  title: string;
  template: string;
  target: string;
  groups: number[];
  schedule: string;
}

export interface EditRequest {
  title: string;
  template: string;
  target: string;
  groups: number[];
  schedule: string;
}

const routes = {
  create: "/broadcasts",
  read: "/broadcasts/{id}",
  edit: "/broadcasts/{id}",
  delete: "/broadcasts/{id}",
  paginate: "/broadcasts/paginate",
  paginateMessages: "/broadcasts/{id}/messages/paginate",
};

export default {
  create(payload: CreateRequest) {
    return api.post<Broadcast>(routes.create, payload);
  },

  read(id: number) {
    const url = routeUtil.replaceParams(routes.read, { id });
    return api.get<Broadcast>(url);
  },

  edit(id: number, payload: EditRequest) {
    const url = routeUtil.replaceParams(routes.edit, { id });
    return api.patch<Broadcast>(url, payload);
  },

  delete(id: number) {
    const url = routeUtil.replaceParams(routes.delete, { id });
    return api.delete<Broadcast>(url);
  },

  paginate(url?: string) {
    const route = url || routes.paginate;
    return api.get<PaginateResponse<Broadcast[]>>(route);
  },

  paginateMessages(url?: string, id?: number) {
    const route = url || routeUtil.replaceParams(routes.paginateMessages, { id });
    return api.get<PaginateResponse<Message[]>>(route);
  },
};
