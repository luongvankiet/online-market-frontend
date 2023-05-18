import moment from "moment";
import { ILogin } from "../Models/Auth";
import { IResource } from "../Models/Resource";
import { IUser } from "../Models/User";
import utils from "../Utils";
import { api } from "../paths";

export const login = (credentials: ILogin) => {
  return utils.fetch.httpGet('/sanctum/csrf-cookie')
    .then((response: any) => {
      return utils.fetch.httpPost(api.auth.login, credentials)
        .then((response: IResource<IUser>) => {
          let user: any = response.data
          user = { ...user, expired_at: moment().add(2, 'hours').toISOString() }
          localStorage.setItem('user', JSON.stringify(user));
        })
    })
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
