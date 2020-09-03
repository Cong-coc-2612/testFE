import axios from 'axios';
import { IParams, IResponse } from "interfaces/common";
import { cookies } from './cookies';
import config from 'config';
import { COOKIES_TYPE } from 'global';

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export async function query<T>(
  uri: string,
  method: METHOD,
  data: IParams = {},
  params: IParams = {},
  path: string | number,
) {
  const baseUrl = config.apiUrl.baseURI;
  const realUrl = `${baseUrl}${uri}`;

  return new Promise<IResponse<T>>((resolve: Function, reject: Function) => {
    switch (method) {
      case METHOD.POST: {
        axios.post(`${realUrl}${path !== '' ? `/${path}` : ''}`, null, {
          params, data, headers: {
            "Authorization": cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? cookies.get(COOKIES_TYPE.AUTH_TOKEN).Authentication : null,
          } })
          .then((response) => {
            console.log('response1', uri, response);
            resolve(response);
          }).catch((error) => {
            console.log('error1', uri, error);
            reject(error);
          });
        break;
      }
      case METHOD.PUT: {
        axios.put(`${realUrl}${path !== '' ? `/${path}` : ''}`, null, {
          params, data, headers: {
            "Authorization": cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? cookies.get(COOKIES_TYPE.AUTH_TOKEN).Authentication : null,
          }
        })
          .then((response) => {
            console.log('response1', uri, response);
            resolve(response);
          }).catch((error) => {
            console.log('error1', uri, error);
            reject(error);
          });
        break;
      }
      case METHOD.GET: {
        axios.get(`${realUrl}${path !== '' ? `/${path}` : ''}`, {
          params, data, headers: {
            "Authorization": cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? cookies.get(COOKIES_TYPE.AUTH_TOKEN).Authentication : null,
          }
        })
          .then((response) => {
            console.log('response1', uri, response);
            resolve(response);
          }).catch((error) => {
            console.log('error1', uri, error);
            reject(error);
          });
        break;
      }
      case METHOD.DELETE: {
        axios.delete(`${realUrl}${path !== '' ? `/${path}` : ''}`, {
          params, data, headers: {
            "Authorization": cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? cookies.get(COOKIES_TYPE.AUTH_TOKEN).Authentication : null,
          }
        })
          .then((response) => {
            console.log('response1', uri, response);
            resolve(response);
          }).catch((error) => {
            console.log('error1', uri, error);
            reject(error);
          });
        break;
      }
      default: {
        break;
      }
    }
  });
}