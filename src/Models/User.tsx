import { api } from "../paths";
import utils from "../Utils";
import { QueryFilters } from "../Utils/url";

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string;
  image_url?: any;
  created_at?: string;
  updated_at?: string;
}

export interface IDeleteManyUsers {
  user_ids: number[];
}

export const getList = (queryFilters?: QueryFilters) => {
  return utils.fetch.httpGet(utils.url.urlWithQueryString(api.users.list, queryFilters ?? {}));
}

export const getById = (id: number) => {
  return utils.fetch.httpGet(utils.url.replaceId(api.users.update, id));
}

export const create = (body: any) => {
  return utils.fetch.httpPost(api.users.create, body);
}

export const update = (id: number, body: any) => {
  return utils.fetch.httpPut(utils.url.replaceId(api.users.update, id), body);
}

export const deleteMany = (ids: IDeleteManyUsers) => {
  return utils.fetch.httpPost(api.users.deleteMany, ids);
}
