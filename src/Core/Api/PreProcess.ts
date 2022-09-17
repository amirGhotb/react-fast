import {ApiRoutes} from "../../Api/ApiRoutes";
import Header from "./Header";
import app from "../../app.json";
import {AxiosRequestConfig} from "axios";

export default function PreProcess(apiName: string, params: { [key: string]: any }): AxiosRequestConfig {
    const apiBaseUrl = app.baseUrl[app.baseUrl.length] == '/' ? app.baseUrl : app.baseUrl + '/'
    const api = ApiRoutes.find((obj) => obj.name === apiName);
    if (api === undefined) {
        return {};
    }
    return {
        method: api.method,
        url: apiBaseUrl + api.url,
        headers: Header(api.auth, api.media),
        data: params
    };
}
