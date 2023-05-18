import { matchRoutes } from "react-router-dom";
import { views } from "../paths";
import { getPaths } from "../routes";

export interface QueryFilters {
  [name: string]: any;
}

export const urlWithQueryString = (url: string, queryFilters: QueryFilters): string => {
  let queryStringArray = Object.keys(queryFilters).map(
    (queryName: string) => {
      if (
        queryFilters[queryName] === undefined
        || queryFilters[queryName] === null
        || queryFilters[queryName] === ''
      ) {
        return '';
      }
      return `${queryName}=` + encodeURI(queryFilters[queryName])
    },
  )

  queryStringArray = queryStringArray.filter(queryString => !!queryString);

  if (queryStringArray.length > 0) {
    let queryString: string = queryStringArray.join('&')

    url += (url.includes('?') ? '&' : '?') + queryString
  }

  return url
}

export const replaceId = (url: string, id: number) => {
  return url.replace(/\{\{\s*id\s*\}\}/gi, id.toString())
}

export const currentPath = (location: any) => {
  const paths = getPaths(views);
  const route = matchRoutes(paths, location);
  return route ? route[0].route.path : null
}
