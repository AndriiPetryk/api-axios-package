"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var qs_1 = require("qs");
/**
 *
 */
var paramsSerializer = function (params) { return qs_1.default.stringify(params); };
/**
 *
 */
var ApiService = /** @class */ (function () {
    /**
     *
     */
    function ApiService(axios) {
        this.axios = axios;
    }
    /**
     *
     */
    ApiService.prototype.get = function (url, params) {
        return this.axios.get(url, {
            params: params,
            paramsSerializer: paramsSerializer
        })
            .then(this.getData)
            .catch(this.getError);
    };
    /**
     *
     */
    ApiService.prototype.post = function (url, body) {
        return this.axios.post(url, body)
            .then(this.getData)
            .catch(this.getError);
    };
    /**
     */
    ApiService.prototype.patch = function (url, body) {
        return this.axios.patch(url, body)
            .then(this.getData)
            .catch(this.getError);
    };
    /**
     *
     */
    ApiService.prototype.put = function (url, body) {
        return this.axios.put(url, body)
            .then(this.getData)
            .catch(this.getError);
    };
    /**
     *
     */
    ApiService.prototype.delete = function (url, body) {
        return this.axios.delete(url, { data: body })
            .then(this.getData)
            .catch(this.getError);
    };
    /**
     *
     */
    ApiService.prototype.getData = function (response) {
        return response.data;
    };
    /**
     *
     */
    ApiService.prototype.getError = function (error) {
        // eslint-disable-next-line no-param-reassign
        error.message = lodash_1.default.get(error, 'response.data.message', error.message || 'Undefined error');
        // @ts-ignore
        return Promise.reject(error);
    };
    return ApiService;
}());
exports.default = ApiService;
