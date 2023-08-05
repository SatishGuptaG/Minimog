"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRestService = void 0;
class BaseRestService {
    get(url, params, callback) {
        this.query(url, params, "GET", null, callback);
    }
    del(url, params, callback) {
        this.query(url, params, "DELETE", null, callback);
    }
    put(url, urlParams, body, callback) {
        this.query(url, urlParams, "GET", body, callback);
    }
    query(url, params, method, data, callback) {
        const finalUrl = this.appendUrlParams(url, params);
        const ajaxParams = {
            url: finalUrl,
            method: method,
            success: x => callback && callback(x)
        };
        if (data) {
            ajaxParams["data"] = data;
        }
        $.ajax(ajaxParams);
    }
    appendUrlParams(baseUrl, params) {
        if (!params)
            return baseUrl;
        for (let a in params) {
            let delimeter;
            if (baseUrl.indexOf("?") > -1) {
                delimeter = "&";
            }
            else {
                delimeter = "?";
            }
            if (baseUrl[baseUrl.length - 1] !== delimeter) {
                baseUrl += delimeter;
            }
            baseUrl += `${encodeURIComponent(a)}=${encodeURIComponent(params[a])}`;
        }
        return baseUrl;
    }
}
exports.BaseRestService = BaseRestService;
//# sourceMappingURL=BaseRestService.js.map