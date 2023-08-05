declare var $;

export interface StringParams {
    [key: string]: string
}

export abstract class BaseRestService {
    protected get<T>(url: string, params: StringParams, callback?: (res: T) => void): void {
        this.query(url, params, "GET", null, callback);
    }

    protected del<T>(url: string, params: StringParams, callback?: (res: T) => void): void {
        this.query(url, params, "DELETE", null, callback);

    }

    protected put<T>(url: string, urlParams: StringParams, body?: any, callback?: (res: T) => void): void {
        this.query(url, urlParams, "GET", body, callback);
    }

    private query<T>(url: string, params: StringParams, method: string, data: any, callback?: (res: T) => void): void {
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

    private appendUrlParams(baseUrl: string, params: StringParams): string {
        if (!params)
            return baseUrl;
        for (let a in params) {
            let delimeter: string;
            if (baseUrl.indexOf("?") > -1) {
                delimeter = "&";
            } else {
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