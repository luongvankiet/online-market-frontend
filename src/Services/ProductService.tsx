import utils from "../Utils";
import { QueryFilters } from "../Utils/url";
import { api } from "../paths";

export const getList = (queryFilters?: QueryFilters) => {
  return utils.fetch.httpGet(utils.url.urlWithQueryString(api.products.index, queryFilters ?? {}));
}

export const getById = (id: number) => {
  return utils.fetch.httpGet(utils.url.replaceId(api.products.detail, id));
}

export const create = (body: any, headers?: any) => {
  return utils.fetch.httpPost(api.products.index, body, headers);
}

export const update = (id: number, body: any, headers?: any) => {
  return utils.fetch.httpPost(utils.url.replaceId(api.products.detail, id), body, headers);
}

export const deleteOne = (id: any) => {
  return utils.fetch.httpDelete(utils.url.replaceId(api.products.detail, id));
}

export const deleteMany = (ids: any) => {
  return utils.fetch.httpPost(api.products.deleteMany, { product_ids: ids });
}
