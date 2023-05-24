import moment from "moment";
import { ILogin } from "../Models/Auth";
import utils from "../Utils";
import { api } from "../paths";

export const login = async (credentials: ILogin) => {
  // await utils.fetch.httpGet('/sanctum/csrf-cookie');
  return utils.fetch.httpPost(api.auth.login, credentials);
}

export const logout = () => {
  return utils.fetch.httpGet(api.auth.logout)
    .then((response: any) => {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
      }
    });
}

export const getAuthenticatedUser = () => {
  return utils.fetch.httpGet(api.auth.user)
}
