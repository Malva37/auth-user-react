/* eslint-disable no-useless-catch */
// import { createClient } from './index.js';
// import { authService } from '../services/authService.js';
// import { accessTokenService } from '../services/accessTokenService.js';
// import { AxiosRequestConfig, AxiosResponse } from 'axios';

// interface RequestConfig {
//   // Define the properties for the request configuration (e.g., method, URL, headers, etc.)
//   method: string;
//   url: string;
//   headers?: { [key: string]: string };
//   // ... other properties
// }

// interface ResponseError {
//   // Define the properties for the response error (e.g., status, statusText, data, etc.)
//   response: {
//     status: number;
//     // other response error properties
//   };
//   config: RequestConfig;
//   // ... other properties
// }

// interface ResponseSuccess<T> {
//   // Define the properties for the successful response (e.g., status, statusText, data, etc.)
//   status: number;
//   statusText: string;
//   data: T;
//   // ... other properties
// }


// export const httpClient = createClient();

// httpClient.interceptors.request.use(onRequest);
// httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   headers?: {
//     [key: string]: string;
//   };
// }

// function onRequest(request: CustomAxiosRequestConfig) {
//   const accessToken = localStorage.getItem('accessToken');

//   if (accessToken) {
//     request.headers = {
//       ...request.headers,
//       Authorization: `Bearer ${accessToken}`,
//     };
//   }

//   return request;
// }

// function onResponseSuccess<T>(res: AxiosResponse<T>): T {
//   return res.data;
// }

// async function onResponseError(error: ResponseError): Promise<any> {
//   const originalRequest = error.config;

//   if (error.response.status !== 401) {
//     throw error;
//   }

//   try {
//     const { accessToken } = await authService.refresh();

//     accessTokenService.save(accessToken);

//     return httpClient.request(originalRequest);
//   } catch (error) {
//     throw error;
//   }
// }


import { createClient } from './index.ts';
import { authService } from '../services/authService.ts';
import { accessTokenService } from '../services/accessTokenService.ts';

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
    // request.headers['Authorization'] = accessToken;
  }

  return request;
}

function onResponseSuccess(res) {
  return res.data;
}

async function onResponseError(error) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  try {
    const { accessToken } = await authService.refresh();

    accessTokenService.save(accessToken);

    return httpClient.request(originalRequest);
  } catch (error) {
    throw error;
  }
}




