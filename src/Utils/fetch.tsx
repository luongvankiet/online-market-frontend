import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'True'
  },
  withCredentials: true,
})

export const httpGet = (url: string) => {
  return http.get(url)
    .then((response: any) => response.data)
}

export const httpPost = (url: string, body: any, headers?: any) => {
  return http.post(url, body, { headers: headers })
    .then((response: any) => response.data)
}

export const httpPut = (url: string, body: any) => {
  return http.put(url, body)
    .then((response: any) => response.data)
}

export const httpDelete = (url: string) => {
  return http.delete(url)
    .then((response: any) => response.data)
}
