import axios, { AxiosRequestConfig, Method } from 'axios';
import { apiUrl } from '../constants/api';

export interface RequestOptions extends AxiosRequestConfig {
    urlParams?: Array<string>;
    version?: string;
    signal?: AbortSignal;
}

export const request = <ResponseType>(
    method: Method,
    endpoint?: string,
    options?: RequestOptions
) => {
    const controller = new AbortController();

    const signal = options?.signal || controller.signal;

    const url = `${endpoint}/${options?.urlParams?.join('/') || ''}`;

    const req = axios.request<ResponseType>({
        url,
        baseURL: apiUrl(options?.version),
        method,
        signal,
        ...options
    });

    return { request: req, controller };
};

export const get = <ResponseType>(endpoint: string, options?: RequestOptions) =>
    request<ResponseType>('GET', endpoint, options);

export const post = <ResponseType>(endpoint: string, options?: RequestOptions) =>
    request<ResponseType>('POST', endpoint, options);

export const patch = <ResponseType>(endpoint: string, options?: RequestOptions) =>
    request<ResponseType>('PATCH', endpoint, options);

//NOTE(Michał): Delete is a keyword so used remove instead
export const remove = <ResponseType>(endpoint: string, options?: RequestOptions) =>
    request<ResponseType>('DELETE', endpoint, options);
