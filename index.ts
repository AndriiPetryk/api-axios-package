import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import _ from 'lodash';
import qs from 'qs';

/**
 *
 */
const paramsSerializer = <TParams>(params: TParams): string => qs.stringify(params);

/**
 *
 */
export default class ApiService {
    axios: AxiosInstance;

    /**
     *
     */
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     *
     */
    get<TResult = any, TParams = undefined>(url: string, params?: TParams): Promise<TResult> {
        return this.axios.get(url, {
            params, paramsSerializer})
            .then(this.getData)
            .catch(this.getError);
    }

    /**
     *
     */
    post<TResult = any, TBody = undefined>(url: string, body?: TBody): Promise<TResult> {
        return this.axios.post(url, body)
            .then(this.getData)
            .catch(this.getError);
    }

    /**
     */
    patch<TResult = any, TBody = any>(url: string, body: TBody): Promise<TResult> {
        return this.axios.patch(url, body)
            .then(this.getData)
            .catch(this.getError);
    }

    /**
     *
     */
    put<TResult = any, TBody = any>(url: string, body: TBody): Promise<TResult> {
        return this.axios.put(url, body)
            .then(this.getData)
            .catch(this.getError);
    }

    /**
     *
     */
    delete<TResult = any, TBody = undefined>(url: string, body?: TBody): Promise<TResult> {
        return this.axios.delete(url, {data: body})
            .then(this.getData)
            .catch(this.getError);
    }

    /**
     *
     */
    getData<T>(response: AxiosResponse<T>): T {
        return response.data;
    }

    /**
     *
     */
    getError(error: AxiosError): Promise<Error> {
        // eslint-disable-next-line no-param-reassign
        error.message = _.get(error, 'response.data.message', error.message || 'Undefined error');
        // @ts-ignore
        return Promise.reject(error);
    }
}

