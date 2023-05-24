import utils from "../Utils";
import { QueryFilters } from "../Utils/url";
import { api } from "../paths";

export const getList = (queryFilters?: QueryFilters) => {
  return utils.fetch.httpGet(utils.url.urlWithQueryString(api.categories.index, queryFilters ?? {}));
}

export const getById = (id: number) => {
  return utils.fetch.httpGet(utils.url.replaceId(api.categories.detail, id));
}

export const create = (body: any) => {
  return utils.fetch.httpPost(api.categories.index, body);
}

export const update = (id: number, body: any) => {
  return utils.fetch.httpPut(utils.url.replaceId(api.categories.detail, id), body);
}

export const deleteOne = (id: any) => {
  return utils.fetch.httpDelete(utils.url.replaceId(api.categories.detail, id));
}

export const deleteMany = (ids: any) => {
  return utils.fetch.httpPost(api.categories.deleteMany, { category_ids: ids });
}
