import utils from "../Utils";
import { QueryFilters } from "../Utils/url";
import { api } from "../paths";

export const getList = (queryFilters?: QueryFilters) => {
  return utils.fetch.httpGet(utils.url.urlWithQueryString(api.orders.index, queryFilters ?? {}));
}

export const getById = (id: number) => {
  return utils.fetch.httpGet(utils.url.replaceId(api.orders.detail, id));
}
